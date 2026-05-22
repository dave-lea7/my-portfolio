'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Code2, Terminal, Cpu, ArrowUpRight, Briefcase, Database, Server } from 'lucide-react';

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
  resume: '',  // 이력서 PDF URL (Netlify 배포 후 추가). 비워두면 버튼이 숨겨집니다.
};
// =========================================================

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [time, setTime] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const fullText = "building reliable systems at scale.";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 70);
    return () => clearInterval(timer);
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
      summary: 'API 서버 및 챗봇 개발·운영',
      projects: [
        '감별마켓(대상그룹) — MSA 도메인 API 4종 설계·운영 (가입자 10만+, 입점 100개+)',
        'Cellook 패션 커머스 — Display / Admin API 개발·운영',
        '카카오 모빌리티 챗봇 — 8개 채널 시나리오 개발 및 내재화 지원'
      ],
      highlights: [
        '카페24 Open API rate limit 문제를 Redis + Lua 스크립트 atomic 카운터로 해결, 호출 실패 제거',
        'MSA 기반 운영·계정·전시·알림 도메인 분리 + 공통 로직 라이브러리화로 서비스 일관성 확보',
        '추천 상품·인증 토큰에 Redis 캐싱 도입으로 응답 속도 개선 및 DB 부하 감소'
      ],
      stack: {
        main: ['C# (.NET Core 6.0)', 'MySQL'],
        sub: ['Node.js', 'TypeScript'],
        infra: ['AWS', 'Amazon Aurora', 'Redis', 'Docker', 'Jenkins', 'Argo CD', 'GitHub Actions'],
        tools: ['GitHub', 'GitLab', 'Jira', 'Confluence', 'Datadog', 'Elasticsearch', 'Grafana']
      }
    },
    {
      period: '2016.12 — 2021.07',
      company: '가비아씨엔에스',
      role: 'IMS 개발팀 · 연구원',
      summary: '판매자 통합관리 솔루션 "주머니" 개발 및 유지보수',
      projects: [
        '전국 셀러 대상 다수 오픈마켓 주문·상품·송장 통합 관리 솔루션 (WinForms)',
        '신규 마켓 다수 연동 (고도몰5, ESM 2.0, 위메프, Lotte ON, T-Mon 등)',
        '클라이언트 동시접속 제한 및 외부 연동용 REST API 신규 구축'
      ],
      highlights: [
        '11번가 주문수집 모듈을 HTML 파싱 → JSON API로 전면 재설계, 사이트 변경 장애 빈도 감소',
        '카페24 주문 수집을 크롤링 → 공식 Open API로 전환, 차단 리스크 제거 및 정확도 향상',
        '솔루션 .NET Framework 2.0 → 4.6 업그레이드, async/await 등 신규 기능 활용 환경 마련'
      ],
      stack: {
        main: ['C# (.NET 2.0 / 4.6)', 'MS-SQL'],
        sub: ['WinForms', 'Infragistics', 'WCF SOAP'],
        infra: ['Windows Server', 'SQL Server 2012'],
        tools: ['RedMine', 'GitLab', 'Visual Studio']
      }
    }
  ];

  const skills = [
    { name: 'C# / .NET', level: 95 },
    { name: '.NET Core', level: 90 },
    { name: 'MS-SQL / MySQL', level: 90 },
    { name: 'REST API 설계', level: 92 },
    { name: 'Redis / 캐싱 전략', level: 82 },
    { name: 'MSA / 도메인 설계', level: 80 },
    { name: 'AWS / Docker', level: 72 },
    { name: 'Node.js / TypeScript', level: 65 }
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
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-[1.05]">
            <span className="text-zinc-100">Lee</span>
            <span className="text-emerald-400">KeunHo</span>
            <span className="text-zinc-500">.dev</span>
          </h1>
          <p className="text-lg text-zinc-500 mb-8">이근호</p>
          
          <p className="text-2xl md:text-3xl text-zinc-400 mb-8 font-light">
            {typedText}
            <span className={`inline-block w-3 h-7 bg-emerald-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <span className="px-3 py-1 text-xs border border-zinc-800 rounded-full text-zinc-400 bg-zinc-900/50">
              <span className="text-emerald-400">●</span> .NET Backend Developer
            </span>
            <span className="px-3 py-1 text-xs border border-zinc-800 rounded-full text-zinc-400 bg-zinc-900/50">
              📍 Incheon, KR
            </span>
            <span className="px-3 py-1 text-xs border border-zinc-800 rounded-full text-zinc-400 bg-zinc-900/50">
              7 years
            </span>
            <span className="px-3 py-1 text-xs border border-zinc-800 rounded-full text-zinc-400 bg-zinc-900/50">
              Solution · Commerce
            </span>
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
                  <span className="text-emerald-400">대규모 주문 처리 환경</span>에서 
                  데이터 정합성과 트랜잭션 문제를 구조적으로 해결해온 
                  7년차 .NET 백엔드 개발자입니다.
                </p>
                <p>
                  오픈마켓 통합 솔루션과 버티컬 커머스 플랫폼을 개발·운영하며,
                  단순 기능 구현을 넘어 
                  <span className="text-zinc-100"> 장애를 줄이고 데이터 신뢰도를 높이는 구조 개선</span>에 
                  집중해왔습니다.
                </p>
                <p>
                  대량 주문의 정합성 보장, Redis 기반 성능 최적화, MSA 도메인 분리까지
                  <span className="text-zinc-100"> 운영 환경의 안정성과 확장성</span>을 
                  지속적으로 개선하는 것을 지향합니다.
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

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {skills.map((skill, i) => (
              <div key={skill.name} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-300">{skill.name}</span>
                  <span className="text-zinc-500 text-xs">{skill.level}%</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%`, animationDelay: `${i * 100}ms` }}
                  />
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

                    {exp.highlights && (
                      <div className="mb-5 rounded-md border border-emerald-400/15 bg-emerald-400/5 p-4">
                        <div className="text-xs text-emerald-400/80 mb-2 flex items-center gap-1.5">
                          ★ key impact
                        </div>
                        <ul className="space-y-2">
                          {exp.highlights.map((h, j) => (
                            <li key={j} className="text-sm text-zinc-300 flex items-start gap-2 leading-relaxed">
                              <span className="text-emerald-400 mt-0.5 flex-shrink-0">→</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

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
