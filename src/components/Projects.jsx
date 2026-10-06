import { ProjectShowcase } from '@/components/ui/project-showcase'
import { WORKS } from '../data.js'

export default function Projects() {
  return (
    <section id="work">
      <div className="wrap">
        <h2>Projects</h2>
        <p className="lead">Real sites and services from my GitHub, each with a live demo and the source code to match.</p>
        <ProjectShowcase
          projects={WORKS}
          label="Projects"
          autoplay={false}
          buttonInscriptions={{ previousButton: 'Previous', nextButton: 'Next' }}
          outlineColor="var(--project-showcase-outline)"
          hoverOutlineColor="var(--project-showcase-outline-hover)"
          halomotButtonGradient="var(--project-showcase-button-gradient)"
          halomotButtonBackground="var(--project-showcase-button-background)"
          halomotButtonTextColor="var(--project-showcase-button-text-color)"
          halomotButtonHoverTextColor="var(--project-showcase-button-hover-text-color)"
          halomotButtonOuterBorderRadius="var(--project-showcase-button-outer-radius)"
          halomotButtonInnerBorderRadius="var(--project-showcase-button-inner-radius)"
          primaryButtonBackground="var(--project-showcase-primary-background)"
          primaryButtonTextColor="var(--project-showcase-primary-text-color)"
        />
        <div className="works-hint">
          <span>Click the stack to flip through pages. Arrow keys work when the carousel is focused: <kbd>←</kbd> <kbd>→</kbd></span>
          <a className="btn" href="https://github.com/AndrewCayanan" target="_blank" rel="noopener noreferrer">More on GitHub</a>
        </div>
      </div>
    </section>
  )
}
