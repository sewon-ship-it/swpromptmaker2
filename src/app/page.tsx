'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Sparkles, Loader2, ArrowRight } from 'lucide-react';

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export default function Home() {
  const [topic, setTopic] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [history, setHistory] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [finalPrompt, setFinalPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, currentQuestion, finalPrompt]);

  const fetchNextQuestion = async (updatedHistory: Message[], step: number, userTopic: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: updatedHistory, currentStep: step, userTopic }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();

      if (data.isFinal) {
        setFinalPrompt(data.finalPrompt);
        setCurrentQuestion(data.question);
        setOptions([]);
      } else {
        setCurrentQuestion(data.question);
        setOptions(data.options);
      }
      
      // Add the AI's response to history so context is maintained
      setHistory(prev => [
        ...prev, 
        { role: 'model', parts: [{ text: JSON.stringify(data) }] }
      ]);
    } catch (error) {
      console.error(error);
      setCurrentQuestion('앗, 문제가 발생했어요. 다시 시도해볼까요? 😢');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    if (!topic.trim()) return;
    setIsStarted(true);
    
    // Initial user message to kick things off
    const initialHistory: Message[] = [
      { role: 'user', parts: [{ text: `주제: ${topic}. 이 주제에 대해 프롬프트를 만들고 싶어요. 질문해주세요.` }] }
    ];
    setHistory(initialHistory);
    fetchNextQuestion(initialHistory, 1, topic);
  };

  const handleOptionSelect = (option: string) => {
    const updatedHistory: Message[] = [
      ...history,
      { role: 'user', parts: [{ text: option }] }
    ];
    setHistory(updatedHistory);
    setCurrentStep(prev => prev + 1);
    setCurrentQuestion('');
    setOptions([]);
    fetchNextQuestion(updatedHistory, currentStep + 1, topic);
  };

  const handleCopy = async () => {
    if (finalPrompt) {
      await navigator.clipboard.writeText(finalPrompt);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <main className="container">
      <div className="app-wrapper">
        <header className="header">
          <div className="logo-container">
            <Sparkles className="icon-bounce text-yellow-400" size={32} />
            <h1>선생님의 요술 프롬프트</h1>
          </div>
          {isStarted && (
            <div className="progress-container">
              <div className="progress-text">진행도 {currentStep} / 10</div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${(Math.min(currentStep, 10) / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </header>

        <div className="content-area">
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <motion.div 
                key="start-screen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="start-screen"
              >
                <div className="bubble greeting-bubble">
                  <h2>안녕하세요, 선생님! 👋</h2>
                  <p>어떤 프롬프트를 만들고 싶으신가요?<br/>간단하게 키워드나 주제를 적어주시면, 제가 10가지 질문을 통해 완벽한 프롬프트로 만들어드릴게요!</p>
                </div>
                
                <div className="input-group">
                  <textarea
                    placeholder="예) 학생들 영어 단어 시험 문제 만들어주는 프롬프트"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={4}
                  />
                  <button 
                    onClick={handleStart} 
                    disabled={!topic.trim() || isLoading}
                    className="primary-btn"
                  >
                    마법 시작하기 <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="chat-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="chat-screen"
              >
                {/* Previous History Summary (Optional, we can just show the current question to keep it clean) */}
                <div className="question-container">
                  <AnimatePresence mode="wait">
                    {currentQuestion && (
                      <motion.div 
                        key={currentQuestion}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bubble ai-bubble"
                      >
                        <p>{currentQuestion}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isLoading && (
                    <div className="loading-state">
                      <Loader2 className="spinner" size={32} />
                      <p>요술 부리는 중...</p>
                    </div>
                  )}

                  {!finalPrompt && options.length > 0 && !isLoading && (
                    <motion.div 
                      className="options-grid"
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                    >
                      {options.map((option, idx) => (
                        <motion.button
                          key={idx}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                          }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="option-btn"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {finalPrompt && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="final-prompt-container"
                    >
                      <div className="final-prompt-box">
                        <pre>{finalPrompt}</pre>
                        <button onClick={handleCopy} className="copy-btn">
                          {isCopied ? <Check size={20} /> : <Copy size={20} />}
                          {isCopied ? '복사완료!' : '프롬프트 복사하기'}
                        </button>
                      </div>
                      <button onClick={() => window.location.reload()} className="secondary-btn mt-4">
                        처음부터 다시하기
                      </button>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
