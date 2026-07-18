export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem', lineHeight: '1.8', color: '#333' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>개인정보 처리방침</h1>
      <p style={{ marginBottom: '2rem' }}>앱뜰(App-Tteul)(이하 '본 서비스')은(는) 서비스 이용자(선생님 등)의 개인정보를 중요시하며, 관련 법령을 준수하고 있습니다.</p>
      
      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>1. 수집하는 개인정보 항목</h3>
      <p>본 서비스는 회원가입, 원활한 서비스 제공을 위해 아래와 같은 개인정보를 수집할 수 있습니다.</p>
      <ul style={{ paddingLeft: '1.5rem' }}>
        <li>필수항목: 이메일, 이름(또는 닉네임)</li>
      </ul>

      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>2. 개인정보의 수집 및 이용 목적</h3>
      <p>본 서비스는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
      <ul style={{ paddingLeft: '1.5rem' }}>
        <li>서비스 제공에 관한 계약 이행 및 교육 활동 지원</li>
        <li>회원 관리 (본인 확인, 개인 식별, 불량 회원의 부정 이용 방지 등)</li>
      </ul>

      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>3. 개인정보의 보유 및 이용 기간</h3>
      <p>원칙적으로, 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
      
      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>4. 개인정보의 파기절차 및 방법</h3>
      <p>회원탈퇴 시 또는 목적 달성 후, 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</p>
      
      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>5. 개인정보 제공</h3>
      <p>본 서비스는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.</p>

      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.2rem' }}>6. 정보관리책임자</h3>
      <p>이름: 박세원</p>
      
      <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '1.2rem', paddingTop: '1rem', borderTop: '1px solid #ddd' }}>부칙</h3>
      <p>본 개인정보 처리방침은 2026년 7월부터 시행됩니다.</p>
    </div>
  );
}
