'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Code2, Terminal, Cpu, ArrowUpRight, Briefcase, Database, Server, Sparkles, Target, Wrench, FileText, FileCode } from 'lucide-react';

// GitHub & LinkedIn 아이콘 (lucide-react 최신 버전에서 제거되어 직접 정의)
const Github = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// =========================================================
// 설정 — 이 부분만 바꾸면 사이트 전체에 반영됩니다
// =========================================================
const CONFIG = {
  email: 'keunholee777@gmail.com',
  github: 'https://github.com/dave-lea7',
  githubLabel: 'github.com/dave-lea7',
  linkedin: '', // 링크드인 URL을 여기에 넣으세요. 비워두면 자동으로 숨겨집니다.
  linkedinLabel: 'linkedin',
  resumePdf: '/resume.pdf',  // public/resume.pdf 위치에 파일을 넣으세요. 비워두면 PDF 버튼이 숨겨집니다.
  resumeMd: 'https://github.com/dave-lea7/career-history',              // 경력기술서 MD GitHub URL. 비워두면 MD 버튼이 숨겨집니다.
};
// =========================================================

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [time, setTime] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const phrases = [
    "Improving stability, scalability, and data consistency in real-world production systems.",
    "운영 환경의 안정성과 데이터 정합성을 개선해온 .NET 백엔드 개발자입니다.",
    "Redis, MSA, and large-scale order processing in production.",
    "대량 주문 처리와 구조 개선으로 운영을 안정화합니다."
  ];
  
  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phraseIndex];

      if (!deleting) {
        // 타이핑 중
        charIndex++;
        setTypedText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          // 다 쳤으면 잠시 멈췄다가 삭제 시작
          deleting = true;
          timeoutId = setTimeout(tick, 2000);
          return;
        }
        timeoutId = setTimeout(tick, 65);
      } else {
        // 삭제 중
        charIndex--;
        setTypedText(current.slice(0, charIndex));
        if (charIndex === 0) {
          // 다 지웠으면 다음 문장으로
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeoutId = setTimeout(tick, 400);
          return;
        }
        timeoutId = setTimeout(tick, 30);
      }
    };

    timeoutId = setTimeout(tick, 500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cursor = setInterval(() => setShowCursor(s => !s), 530);
    return () => clearInterval(cursor);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const keywords = [
    '데이터 정합성',
    '트랜잭션 처리',
    '대량 주문 처리',
    'Redis 캐싱',
    'Rate Limiting',
    'MSA 도메인 분리',
    '오픈마켓 연동',
    '운영 안정성',
    'Communication'
  ];

  const experiences = [
    {
      period: '2023.02 — 2025.09',
      company: '그린앤그레이',
      role: '플랫폼 개발팀 · 사원',
      summary: '버티컬 커머스 플랫폼 API 서버 및 챗봇 개발·운영 (AWS · 인프라팀 협업 구조)',
      projects: [
        '감별마켓(대상그룹) — MSA 도메인 API 4종 설계·운영 · 가입자 10만+ / 입점 100개+',
        'Cellook 패션 커머스 — Display / Admin API 개발·운영',
        '카카오 모빌리티 챗봇 — 8개 채널 시나리오 개발 및 내재화 지원',
        'Jenkins · Argo CD 배포 파이프라인 운영 / Datadog · Elasticsearch 기반 장애 대응'
      ],
      stack: {
        main: ['C# (.NET Core 6.0)', 'MySQL', 'Redis'],
        sub: ['Node.js', 'TypeScript'],
        infra: ['AWS', 'Docker', 'Jenkins', 'Argo CD', 'GitHub Actions'],
        tools: ['Datadog', 'Elasticsearch', 'Grafana', 'Jira', 'Confluence']
      }
    },
    {
      period: '2016.12 — 2021.07',
      company: '가비아씨엔에스',
      role: 'IMS 개발팀 · 연구원',
      summary: '판매자 통합관리 솔루션 "주머니" — 주문·배송 처리 영역 담당 (WinForms)',
      projects: [
        '주문 수집·상태 변경·발주 처리 등 핵심 배송 업무 기능 개발',
        '대량 주문 엑셀 일괄 다운로드 / 송장 일괄 업로드 반영 기능 구현',
        '신규 마켓 다수 연동 (고도몰5, ESM 2.0, 위메프, Lotte ON, T-Mon 등)',
        '클라이언트 동시접속 세션 제어 + 외부 연동용 REST API 신규 구축',
        '배송관리 서버 IDC 직접 이전 (온프레미스 인프라 운영 경험)'
      ],
      stack: {
        main: ['C# (.NET 2.0 / 4.6)', 'MS-SQL'],
        sub: ['WinForms', 'Infragistics', 'WCF SOAP'],
        infra: ['Windows Server', 'IIS', 'SQL Server 2012', '온프레미스'],
        tools: ['RedMine', 'GitLab', 'Visual Studio']
      }
    }
  ];

  const keyProjects = [
    {
      title: '카페24 Open API Rate Limit 안정화',
      project: '감별마켓 · 입점 마켓 연동',
      tags: ['Redis', 'Lua Script', 'Atomic Counter'],
      situation: '입점 마켓 100여 개 상품을 카페24 기반으로 연동하는 구조로 전환',
      trouble: 'API 호출량이 카페24 limit 정책에 근접해 호출 실패 발생, 데이터 동기화 지연',
      action: 'Redis + Lua 스크립트로 atomic 호출 카운터와 delay 로직을 구현해 분산 환경에서도 원자적으로 호출량 제어',
      result: ['Rate limit 초과 호출 실패 제거', '데이터 동기화 안정화', '외부 연동 운영 부담 감소']
    },
    {
      title: '대량 주문 처리 정합성 개선',
      project: '오픈마켓 통합 · 트랜잭션 설계',
      tags: ['Transaction', 'Idempotency', 'Retry'],
      situation: '다수 오픈마켓의 주문을 수집·처리하는 과정에서 대량 주문이 동시에 유입되는 환경',
      trouble: '트랜잭션 충돌로 중복 처리·상태 불일치·일부 데이터 유실이 발생, 운영 이슈와 고객 불만으로 연결',
      action: '트랜잭션 범위를 재설계하고 요청 단위의 idempotent 처리와 재시도 로직을 도입해 동시 유입 상황에서도 정합성을 보장하는 구조로 개선',
      result: ['주문 처리 오류 대폭 감소', '데이터 정합성 보장', '운영 안정성 및 신뢰도 향상']
    },
    {
      title: 'MSA 기반 도메인 API 분리 운영',
      project: '감별마켓 · 아키텍처 설계',
      tags: ['MSA', 'Domain Separation', 'Common Library', 'NuGet'],
      situation: '가입자 10만+ 규모의 식품 버티컬 커머스 신규 구축',
      trouble: '기능 중심 구성으로 서비스 간 결합도가 높아 유지보수와 독립 배포가 어려운 구조',
      action: '운영·계정·전시·알림 4개 도메인 API를 분리하고, 공통 정책·코드를 common-service-library로 추출해 GitHub Actions NuGet 자동 배포로 버전 관리',
      result: ['서비스 간 결합도 감소', '도메인별 독립 배포 확보', '공통 로직 일관성 유지']
    },
    {
      title: 'Redis 캐싱 기반 조회 성능 개선',
      project: '감별마켓 · 성능 최적화',
      tags: ['Redis', 'Caching', '개인화 추천'],
      situation: '대량 트래픽 환경에서 추천 상품 조회와 사용자 인증이 빈번하게 발생',
      trouble: '추천 상품·인증 토큰 조회가 매번 DB를 거치며 응답 지연과 DB 부하 유발',
      action: '추천 상품 데이터와 인증 토큰(access/refresh)에 Redis 캐싱을 도입하고, 찜·연령·관심분야 기반 개인화 추천 로직과 결합',
      result: ['핵심 조회 API 응답 속도 개선', 'DB 부하 감소', '개인화 추천으로 사용자 전환율 향상']
    },
    {
      title: '11번가 주문수집 모듈 재설계',
      project: '가비아 주머니 · 안정화',
      tags: ['REST API', 'JSON', '레거시 개선'],
      situation: '다수 오픈마켓 주문을 수집·통합 관리하는 솔루션 운영',
      trouble: 'HTML 파싱 방식의 주문 수집이 11번가 사이트 구조 변경 시마다 장애 발생, 운영 부담 가중',
      action: 'HTML 파싱 구조를 JSON 기반 API 호출 방식으로 전면 재설계해 사이트 변경에 영향받지 않는 구조로 전환',
      result: ['사이트 구조 변경 장애 빈도 감소', '데이터 파싱 안정성 향상', '운영 유지보수 비용 절감']
    }
  ];

  const troubleshooting = [
    {
      title: '대량 주문 트랜잭션 충돌 해결',
      detail: '트랜잭션 범위 재설계 · idempotent 처리 · 재시도 로직 도입'
    },
    {
      title: 'Cafe24 API Rate Limit 안정화',
      detail: 'Redis + Lua 기반 atomic counter 및 delay 로직 구현'
    },
    {
      title: '클라이언트 동시접속 세션 제어',
      detail: '커넥션 풀에서 접속 계정 관리 · 동일 계정 다른 PC 접속 시 차단 구조'
    },
    {
      title: 'IDC 배송관리 서버 이전',
      detail: 'Windows / DB / 웹서비스 / 방화벽 사전 설정 → 일요일 야간 무중단 이전 수행'
    },
    {
      title: 'MSA 공통 정책 분리',
      detail: 'common-service-library 추출 + NuGet 자동 배포 구조 적용'
    },
    {
      title: '장애 감지 자동화',
      detail: 'API 에러 발생 시 Teams 봇 알림 연동으로 장애 감지 시간 단축'
    }
  ];

  const skillGroups = [
    {
      category: 'Backend',
      items: ['C#', '.NET Core', 'REST API', 'Redis', 'MySQL', 'MS-SQL']
    },
    {
      category: 'Architecture',
      items: ['MSA', 'Domain Separation', 'Common Library', '데이터 정합성']
    },
    {
      category: 'Infra / DevOps',
      items: ['AWS', 'Docker', 'Jenkins', 'Argo CD (GitOps)', 'GitHub Actions', '온프레미스']
    },
    {
      category: 'Monitoring',
      items: ['Datadog', 'Elasticsearch', 'Grafana']
    }
  ];

  const aiTools = [
    {
      name: 'GitHub Copilot',
      use: '반복 코드 자동 완성 및 보일러플레이트 생성으로 개발 속도 향상'
    },
    {
      name: 'Claude',
      use: '레거시 코드 분석 및 리팩토링 설계, 복잡한 로직 구조화 보조'
    },
    {
      name: 'GPT',
      use: '코드 리뷰 보조, 문서화, 반복 작업 자동화로 코드 품질 개선'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono relative overflow-hidden">
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div 
        className="fixed pointer-events-none w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, #34d399 0%, transparent 70%)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-zinc-500 ml-2">~/portfolio — zsh</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <span className="hidden sm:inline">{time}</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              online
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 relative">
        
        {/* HERO */}
        <section className="mb-32">
          <div className="text-zinc-500 text-sm mb-4">
            <span className="text-emerald-400">$</span> whoami
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-3 leading-[1.05]">
            <span className="text-zinc-100">KeunHo</span>{' '}
            <span className="text-emerald-400">Lee</span>
          </h1>
          <p className="text-lg text-zinc-500 mb-1">이근호</p>

          <p className="text-xl md:text-2xl text-zinc-200 font-semibold mt-6">
            .NET Backend Developer
          </p>
          <p className="text-base md:text-lg text-zinc-400 mb-6">
            E-Commerce Platform &amp; Solution Engineer
          </p>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-8 font-light max-w-3xl leading-relaxed border-l-2 border-emerald-400/50 pl-4 min-h-[3.5rem] sm:min-h-[3rem]">
            {typedText}
            <span className={`inline-block w-2.5 h-6 bg-emerald-400 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <span className="px-3 py-1 text-xs border border-zinc-800 rounded-full text-zinc-400 bg-zinc-900/50">
              <span className="text-emerald-400">●</span> 7 years
            </span>
            <span className="px-3 py-1 text-xs border border-zinc-800 rounded-full text-zinc-400 bg-zinc-900/50">
              📍 Incheon, KR
            </span>
            <span className="px-3 py-1 text-xs border border-zinc-800 rounded-full text-zinc-400 bg-zinc-900/50">
              E-Commerce
            </span>
            <span className="px-3 py-1 text-xs border border-zinc-800 rounded-full text-zinc-400 bg-zinc-900/50">
              B2B Solution
            </span>
          </div>

          {/* 핵심 역량 — 면접관이 5초 안에 보는 부분 */}
          <div className="grid sm:grid-cols-2 gap-3 mb-10 max-w-3xl">
            {[
              'Redis Lua 기반 API Rate Limit 제어',
              'MSA 기반 도메인 API 분리 운영',
              '대량 주문 처리 구조 개선 및 데이터 정합성 확보',
              'AWS / Jenkins / Argo CD 운영 경험'
            ].map((item, i) => (
              <div 
                key={i}
                className="flex items-start gap-2.5 text-sm text-zinc-300 border border-zinc-800 rounded-lg px-4 py-3 bg-zinc-900/30 hover:border-emerald-400/30 transition-all"
              >
                <span className="text-emerald-400 mt-0.5 flex-shrink-0">▹</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a 
              href={`mailto:${CONFIG.email}`}
              className="group px-5 py-2.5 bg-emerald-400 text-zinc-950 text-sm font-semibold rounded hover:bg-emerald-300 transition-all flex items-center gap-2"
            >
              <Mail size={14} />
              연락하기
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            {CONFIG.resumePdf && (
              <a 
                href={CONFIG.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded hover:border-emerald-400 hover:text-emerald-400 transition-all flex items-center gap-2"
              >
                <FileText size={14} />
                경력기술서 (PDF)
              </a>
            )}
            {CONFIG.resumeMd && (
              <a 
                href={CONFIG.resumeMd}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded hover:border-emerald-400 hover:text-emerald-400 transition-all flex items-center gap-2"
              >
                <FileCode size={14} />
                경력기술서 (MD)
              </a>
            )}
            <a 
              href={CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-zinc-700 text-zinc-300 text-sm rounded hover:border-emerald-400 hover:text-emerald-400 transition-all flex items-center gap-2"
            >
              <Github size={14} />
              {CONFIG.githubLabel}
            </a>
          </div>
        </section>

        {/* ABOUT */}
        <section className="mb-32">
          <div className="text-zinc-500 text-sm mb-4">
            <span className="text-emerald-400">$</span> cat about.md
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Terminal className="text-emerald-400" size={28} />
                About
              </h2>
              <div className="space-y-4 text-zinc-300 leading-relaxed">
                <p>
                  오픈마켓 통합 솔루션과 버티컬 커머스 플랫폼을 개발·운영하며 
                  <span className="text-emerald-400"> 대규모 주문 처리</span>, 
                  <span className="text-emerald-400"> 데이터 정합성</span>, 
                  <span className="text-emerald-400"> 성능 최적화</span>, 
                  <span className="text-emerald-400"> 서비스 구조 개선</span>을 
                  수행해온 7년차 .NET 백엔드 개발자입니다.
                </p>
                <p>
                  커머스 도메인에서 발생하는 운영 이슈를 해결하며
                  <span className="text-zinc-100"> 서비스 안정성과 데이터 신뢰성</span>을 
                  높여왔습니다.
                </p>
                <p>
                  단순 기능 구현에 그치지 않고 운영 환경에서 발생하는
                  <span className="text-zinc-100"> 트랜잭션 충돌, 외부 API 제약, 성능 병목, 서비스 간 결합도 문제</span>를 
                  해결하며 안정적이고 확장 가능한 시스템을 설계하는 데 집중해왔습니다.
                </p>
              </div>

              <div className="mt-8">
                <div className="text-xs text-zinc-500 mb-3">// keywords</div>
                <div className="flex flex-wrap gap-2">
                  {keywords.map(k => (
                    <span 
                      key={k}
                      className="px-3 py-1.5 text-xs bg-emerald-400/5 border border-emerald-400/20 text-emerald-300 rounded hover:bg-emerald-400/10 hover:border-emerald-400/40 transition-all cursor-default"
                    >
                      #{k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-zinc-800 rounded p-5 bg-zinc-900/30 backdrop-blur-sm h-fit">
              <div className="text-xs text-zinc-500 mb-3 flex items-center gap-2">
                <Cpu size={12} /> SYSTEM INFO
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">os</span>
                  <span className="text-zinc-300">Windows</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">ide</span>
                  <span className="text-zinc-300">VS / VS Code</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">runtime</span>
                  <span className="text-zinc-300">.NET Core 6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">db</span>
                  <span className="text-zinc-300">MySQL / MS-SQL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">monitor</span>
                  <span className="text-zinc-300">Datadog</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t border-zinc-800">
                  <span className="text-zinc-500">focus</span>
                  <span className="text-emerald-400">production stability</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t border-zinc-800">
                  <span className="text-zinc-500">coffee</span>
                  <span className="text-emerald-400">∞ cups/day</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="mb-32">
          <div className="text-zinc-500 text-sm mb-4">
            <span className="text-emerald-400">$</span> ls ./skills
          </div>
          
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Code2 className="text-emerald-400" size={28} />
            Stack
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {skillGroups.map((group) => (
              <div 
                key={group.category}
                className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/30 backdrop-blur-sm hover:border-emerald-400/30 transition-all"
              >
                <div className="text-xs text-emerald-400/80 mb-3 font-semibold uppercase tracking-wider">
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span 
                      key={item}
                      className="text-sm px-3 py-1 bg-zinc-800/60 text-zinc-300 rounded border border-zinc-700/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KEY PROJECTS */}
        <section className="mb-32">
          <div className="text-zinc-500 text-sm mb-4">
            <span className="text-emerald-400">$</span> cat ./key-projects/*.md
          </div>
          
          <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
            <Target className="text-emerald-400" size={28} />
            Key Projects
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl text-sm leading-relaxed">
            운영 환경에서 마주한 문제를 어떻게 분석하고 개선했는지,
            상황 · 문제 · 해결 · 결과 중심으로 정리했습니다.
          </p>

          <div className="space-y-6">
            {keyProjects.map((p, i) => (
              <div 
                key={i}
                className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/30 backdrop-blur-sm hover:border-emerald-400/30 transition-all"
              >
                {/* 헤더 */}
                <div className="border-b border-zinc-800 p-5 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 mb-1">{p.title}</h3>
                    <p className="text-xs text-zinc-500">{p.project}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(t => (
                      <span key={t} className="text-[11px] px-2 py-0.5 bg-emerald-400/10 text-emerald-300 rounded border border-emerald-400/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* STAR 본문 */}
                <div className="p-5 space-y-4">
                  <div className="grid sm:grid-cols-[80px_1fr] gap-1 sm:gap-3">
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pt-0.5">Situation</div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{p.situation}</p>
                  </div>
                  <div className="grid sm:grid-cols-[80px_1fr] gap-1 sm:gap-3">
                    <div className="text-xs font-semibold text-red-400/70 uppercase tracking-wider pt-0.5">Problem</div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{p.trouble}</p>
                  </div>
                  <div className="grid sm:grid-cols-[80px_1fr] gap-1 sm:gap-3">
                    <div className="text-xs font-semibold text-blue-400/70 uppercase tracking-wider pt-0.5">Action</div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{p.action}</p>
                  </div>
                  <div className="grid sm:grid-cols-[80px_1fr] gap-1 sm:gap-3">
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider pt-0.5">Result</div>
                    <div className="flex flex-wrap gap-2">
                      {p.result.map((r, j) => (
                        <span key={j} className="text-sm text-emerald-300 bg-emerald-400/5 border border-emerald-400/20 rounded px-2.5 py-1">
                          ✓ {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TROUBLESHOOTING */}
        <section className="mb-32">
          <div className="text-zinc-500 text-sm mb-4">
            <span className="text-emerald-400">$</span> grep -r "resolved" ./logs
          </div>
          
          <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
            <Wrench className="text-emerald-400" size={28} />
            Troubleshooting
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl text-sm leading-relaxed">
            운영 중 마주한 다양한 문제를 분석하고 개선한 경험입니다.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {troubleshooting.map((t, i) => (
              <div 
                key={i}
                className="flex items-start gap-3 border border-zinc-800 rounded-lg p-4 bg-zinc-900/30 backdrop-blur-sm hover:border-emerald-400/30 transition-all"
              >
                <span className="text-emerald-400 mt-0.5 flex-shrink-0 font-mono text-sm">▹</span>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100 mb-1">{t.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mb-32">
          <div className="text-zinc-500 text-sm mb-4">
            <span className="text-emerald-400">$</span> git log --career
          </div>
          
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Briefcase className="text-emerald-400" size={28} />
            Experience
          </h2>

          <div className="relative">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/50 via-zinc-700 to-transparent" />

            <div className="space-y-10">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-emerald-400 bg-zinc-950 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>

                  <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/30 backdrop-blur-sm hover:border-emerald-400/30 transition-all">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-xl font-bold text-zinc-100">{exp.company}</h3>
                      <span className="text-xs text-emerald-400 font-mono">{exp.period}</span>
                    </div>
                    <p className="text-sm text-zinc-500 mb-1">{exp.role}</p>
                    {exp.summary && (
                      <p className="text-sm text-zinc-400 mb-4">{exp.summary}</p>
                    )}

                    <div className="mb-5">
                      <div className="text-xs text-zinc-500 mb-2">// projects</div>
                      <ul className="space-y-1.5">
                        {exp.projects.map((p, j) => (
                          <li key={j} className="text-sm text-zinc-300 flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5">▸</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                          <Code2 size={11} /> language & framework
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.stack.main.map(t => (
                            <span key={t} className="text-[11px] px-2 py-0.5 bg-emerald-400/10 text-emerald-300 rounded border border-emerald-400/20">
                              {t}
                            </span>
                          ))}
                          {exp.stack.sub.map(t => (
                            <span key={t} className="text-[11px] px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded border border-zinc-700">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                          <Database size={11} /> infra & db
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.stack.infra.map(t => (
                            <span key={t} className="text-[11px] px-2 py-0.5 bg-zinc-900 text-zinc-400 rounded border border-zinc-800">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-zinc-500 mb-1.5 flex items-center gap-1.5">
                          <Server size={11} /> tools
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.stack.tools.map(t => (
                            <span key={t} className="text-[11px] px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded border border-zinc-800">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI TOOLS */}
        <section className="mb-32">
          <div className="text-zinc-500 text-sm mb-4">
            <span className="text-emerald-400">$</span> ai --augment-workflow
          </div>
          
          <h2 className="text-3xl font-bold mb-3 flex items-center gap-3">
            <Sparkles className="text-emerald-400" size={28} />
            AI-Assisted Development
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl text-sm leading-relaxed">
            AI 개발 도구를 실무에 적극 활용하여 레거시 코드 분석, 반복 작업 자동화,
            코드 리뷰 보조를 통해 개발 생산성과 코드 품질을 함께 높이고 있습니다.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {aiTools.map((tool) => (
              <div 
                key={tool.name}
                className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/30 backdrop-blur-sm hover:border-emerald-400/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-emerald-400">◆</span>
                  <h3 className="text-base font-bold text-zinc-100">{tool.name}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{tool.use}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="mb-16">
          <div className="text-zinc-500 text-sm mb-4">
            <span className="text-emerald-400">$</span> ./contact.sh
          </div>
          
          <div className="border border-zinc-800 rounded-lg p-8 md:p-12 bg-gradient-to-br from-zinc-900/50 to-transparent">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              함께 일해볼까요?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl">
              새로운 기회나 흥미로운 프로젝트가 있으시다면 언제든지 연락 주세요.
              커머스 도메인과 .NET 백엔드 이야기는 항상 환영입니다.
            </p>
            <div className="flex flex-wrap gap-5">
              <a 
                href={CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition-colors"
              >
                <Github size={18} />
                <span className="border-b border-zinc-700 group-hover:border-emerald-400">{CONFIG.githubLabel}</span>
              </a>
              <a 
                href={`mailto:${CONFIG.email}`}
                className="group flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition-colors"
              >
                <Mail size={18} />
                <span className="border-b border-zinc-700 group-hover:border-emerald-400">{CONFIG.email}</span>
              </a>
              {CONFIG.linkedin && (
                <a 
                  href={CONFIG.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition-colors"
                >
                  <Linkedin size={18} />
                  <span className="border-b border-zinc-700 group-hover:border-emerald-400">{CONFIG.linkedinLabel}</span>
                </a>
              )}
              {CONFIG.resumePdf && (
                <a 
                  href={CONFIG.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition-colors"
                >
                  <FileText size={18} />
                  <span className="border-b border-zinc-700 group-hover:border-emerald-400">경력기술서 (PDF)</span>
                </a>
              )}
              {CONFIG.resumeMd && (
                <a 
                  href={CONFIG.resumeMd}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition-colors"
                >
                  <FileCode size={18} />
                  <span className="border-b border-zinc-700 group-hover:border-emerald-400">경력기술서 (MD)</span>
                </a>
              )}
            </div>
          </div>
        </section>

        <footer className="pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row justify-between gap-3 text-xs text-zinc-600">
          <div>© 2026 Lee Keun Ho — Built with .NET ❤ + ☕</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            v1.0.0 — Incheon, KR
          </div>
        </footer>
      </div>
    </div>
  );
}
