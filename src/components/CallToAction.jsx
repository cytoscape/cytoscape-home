import { Button } from '@/components/base/Button'
import { Container } from '@/components/base/Container'
import { CircleBackground } from '@/components/CircleBackground'
import PropTypes from 'prop-types'

export function CallToAction({ onGetStarted }) {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Get your first results
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            In just under a minute, we&apos;ll walk you through a few questions to find the perfect tool for your needs.
            You don&apos;t even need to create an account or provide any personal information.
          </p>
          <div className="mt-8 flex justify-center">
            <Button variant="solid" color="primary" onClick={onGetStarted} className="min-w-44 text-gray-900">
              <span className="text-center">Get Started</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
CallToAction.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
}
