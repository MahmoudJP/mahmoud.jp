import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Layers3, LockKeyhole, Sparkles } from "lucide-react";
import { featuredStudioProjects, studioProjects } from "@/lib/studio-data";

export default function StudioPage() {
  return (
    <main className="studio-public">
      <nav className="studio-public-nav" aria-label="Studio navigation">
        <Link href="/" className="studio-back"><ArrowLeft size={15} /> mahmoud.jp</Link>
        <Link href="/studio/login" className="studio-owner-link"><LockKeyhole size={14} /> Owner access</Link>
      </nav>

      <section className="studio-public-hero">
        <div className="studio-orbit" aria-hidden="true"><span>M</span></div>
        <p className="studio-kicker"><Sparkles size={14} /> PERSONAL PRODUCT STUDIO</p>
        <h1>Where design, language,<br />and technology meet.</h1>
        <p className="studio-public-lead">
          Mahmoud Studio is the working record behind my portfolio: products I am building,
          systems I am refining, and experiments that turn recurring problems into useful tools.
        </p>
        <div className="studio-public-actions">
          <a href="#selected-work" className="studio-primary-action">Explore selected work <ArrowRight size={16} /></a>
          <Link href="/projects" className="studio-secondary-action">Portfolio projects</Link>
        </div>
        <div className="studio-public-stats" aria-label="Studio overview">
          <span><strong>{studioProjects.length}</strong> tracked projects</span>
          <span><strong>3</strong> disciplines</span>
          <span><strong>Tokyo</strong> based</span>
        </div>
      </section>

      <section className="studio-selected" id="selected-work">
        <div className="studio-section-heading">
          <div><p>SELECTED WORK</p><h2>Products with a reason to exist.</h2></div>
          <span>Design · Engineering · Language</span>
        </div>
        <div className="studio-showcase-grid">
          {featuredStudioProjects.map((project, index) => (
            <article className="studio-showcase-card" key={project.slug}>
              <div className="studio-card-number">0{index + 1}</div>
              <div className="studio-card-mark">{project.initials}</div>
              <p className="studio-card-platform">{project.platform}</p>
              <h3>{project.name}</h3>
              <p>{project.publicSummary}</p>
              <div className="studio-skill-list">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              <div className="studio-card-state"><i /> {project.state}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="studio-method">
        <div className="studio-method-copy">
          <p className="studio-kicker"><Layers3 size={14} /> HOW I WORK</p>
          <h2>Every release keeps its context.</h2>
          <p>I separate saved code, stable checkpoints, and the version people actually use. That makes experimentation safer and handoffs clearer.</p>
        </div>
        <div className="studio-release-track">
          <div><i className="latest" /><span><small>Latest code</small><strong>Ideas in motion</strong></span></div>
          <div><i className="stable" /><span><small>Stable checkpoint</small><strong>Tested and trusted</strong></span></div>
          <div><i className="live" /><span><small>Live release</small><strong>Deliberately published</strong></span></div>
        </div>
      </section>

      <footer className="studio-public-footer">
        <div><strong>Mahmoud Studio</strong><span>Building useful bridges between disciplines.</span></div>
        <Link href="/" className="studio-footer-link">Return to portfolio <ExternalLink size={14} /></Link>
      </footer>
    </main>
  );
}
