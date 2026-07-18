import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #eaeaea',
      padding: '2rem 0',
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.8rem',
      fontSize: '0.875rem',
      color: '#666',
      backgroundColor: '#f9f9f9',
    }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link href="/privacy" style={{ fontWeight: 'bold', color: '#444', textDecoration: 'none' }}>개인정보 처리방침</Link>
        <span style={{ color: '#ccc' }}>|</span>
        <Link href="/terms" style={{ fontWeight: 'bold', color: '#444', textDecoration: 'none' }}>이용약관</Link>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '0.5rem' }}>
        <span>정보관리책임자: 박세원</span>
        <span style={{ color: '#ccc' }}>|</span>
        <span>Copyright © 2026 중앙대학교사범대부속초등학교 박세원. All rights reserved.</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>시행일: 2026년 7월</span>
        <span style={{ color: '#ccc' }}>|</span>
        <span>최근 변경일: 2026년 7월</span>
      </div>
    </footer>
  );
}
