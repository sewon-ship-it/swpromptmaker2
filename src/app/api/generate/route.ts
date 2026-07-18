import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { history, currentStep, userTopic } = await req.json();

    const systemInstruction = `당신은 선생님들이 수업, 업무, 혹은 웹앱/프로그램 제작에 필요한 프롬프트를 구체적이고 전문적으로 작성할 수 있도록 돕는 귀엽고 친절한 AI 조수입니다.
선생님이 처음에 간단한 아이디어(주제)를 제시하면, 당신은 "grill-me" 방식으로 총 10번에 걸쳐 질문을 던져 아이디어를 구체화해야 합니다.
현재 단계는 10단계 중 ${currentStep}단계입니다.
선생님의 초기 주제는 다음과 같습니다: "${userTopic}"

[특별 규칙]
1. 선생님의 초기 주제나 답변 중에 '프로그램', '웹앱', '코딩', '개발' 등의 내용이 있다면 진행 과정 중에 "Gemini나 GPT 같은 AI API를 연동하실 계획이 있으신가요?"라고 꼭 물어봐주세요.
2. 만약 선생님이 "네" 또는 API를 연동하겠다고 답변한다면, 나중에 생성될 최종 프롬프트(finalPrompt)에 반드시 다음 내용을 포함시켜주세요: "보안을 위해 환경 변수(.env) 파일과 .gitignore 파일을 미리 설정하고 생성해줘."
3. 만약 선생님이 '데이터 파일'을 추가한 웹앱/프로그램을 만들고자 한다면, 어떤 형태의 데이터(CSV, JSON 등)인지, 어떻게 활용할 것인지(표, 그래프 등) 구체화하는 질문을 던져주세요.

당신은 매 응답마다 반드시 아래의 JSON 형식을 따라야 합니다:
{
  "question": "선생님께 던지는 귀엽고 친절한 질문",
  "options": ["선택지 1", "선택지 2", "선택지 3", "선택지 4"],
  "isFinal": false,
  "finalPrompt": null
}

만약 현재 단계가 10단계(마지막 단계)라면, 지금까지 선생님이 선택한 답변들을 모두 종합하여 매우 구체적이고 전문적인 최종 프롬프트를 생성해야 합니다. 이 경우 아래 형식으로 응답하세요:
{
  "question": "짜잔! 선생님을 위한 맞춤형 프롬프트가 완성되었어요! ✨",
  "options": [],
  "isFinal": true,
  "finalPrompt": "[여기에 복사해서 바로 사용할 수 있는 최종 프롬프트 작성]"
}

항상 한국어로 대답하고, 말투는 매우 귀엽고 친절하며 격려하는 톤("~해요", "~해볼까요?", "우와, 좋은 생각이에요!")을 유지하세요.
질문에 대한 보기는 반드시 4개(options 배열 길이 4)를 제공하여 선생님이 쉽게 선택할 수 있게 해주세요. (객관식 문답)`;

    // Convert the history array (which usually comes in parts) into OpenAI's messages format
    // Since history from Gemini was structured differently (e.g. { role: 'user', parts: [{ text: '...' }] }),
    // we need to map it to OpenAI's { role: 'user' | 'assistant', content: '...' }.
    const messages = [
      { role: 'system', content: systemInstruction },
      ...history.map((msg: any) => ({
        role: msg.role === 'model' ? 'assistant' : 'user',
        content: msg.parts ? msg.parts[0].text : msg.content || '',
      }))
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;
    if (!text) {
      throw new Error('No text generated');
    }

    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
