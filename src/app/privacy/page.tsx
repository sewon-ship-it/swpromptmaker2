import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem', lineHeight: '1.8', color: '#333' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>개인정보 처리방침</h1>
      <p style={{ marginBottom: '2rem' }}>본 서비스는 서비스 이용자(선생님 등)의 개인정보를 중요시하며, 관련 법령을 준수하고 있습니다.</p>
      
      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>1. 개인정보 수집 항목 및 목적</h3>
      <p>본 서비스는 회원가입 절차가 없으며, 원활한 서비스(프롬프트 생성 기능 등) 제공을 위해 이용자의 <strong>이름, 이메일, 연락처 등 어떠한 개인정보도 수집하지 않습니다.</strong></p>
      
      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>2. 자동 수집되는 정보</h3>
      <p>서비스 이용 과정에서 서비스 개선 및 오류 분석 등을 위해 서비스 이용 기록(접속 IP 정보, 접속 로그 등)이 자동으로 생성되어 수집될 수 있으나, 이는 개인을 식별할 수 없는 형태로 처리됩니다.</p>

      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>3. 개인정보의 제3자 제공</h3>
      <p>본 서비스는 개인정보를 수집하지 않으므로, 제3자에게 제공할 개인정보 또한 없습니다.</p>

      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>4. 정보관리책임자</h3>
      <p>본 서비스의 이용과 관련한 문의사항은 아래의 정보관리책임자에게 연락하여 주시기 바랍니다.</p>
      <p>이름: 박세원</p>
      
      <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>부칙</h3>
      <p>본 개인정보 처리방침은 2026년 7월부터 시행됩니다.</p>
      
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#333', padding: '1rem 2rem', background: '#e0e0e0', borderRadius: '15px', fontWeight: 'bold' }}>
          <ArrowLeft size={18} /> 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
