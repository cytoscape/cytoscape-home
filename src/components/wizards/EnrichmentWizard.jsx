import { useRef, useEffect } from 'react'

const stepsDef = [
  {
    title: "EnrichmentMap:RNA-Seq",
    component: EMPanel,
  },
]

function EMPanel() {
  return (
    <div className="text-gray-600">
      <img src="/images/apps/em-web.png" alt="EnrichmentMap" className="w-fit mx-auto border-4 rounded-lg" />
      <p className="mt-5">
        Use EnrichmentMap to perform a gene set enrichment analysis and then visualize the results as a network.
      </p>
    </div>
  )
}

export function EnrichmentWizard({ step, setTotalSteps, setTitle, setSubmitLabel, onCanContinue, onSubmit }) {
  const genesRef = useRef([])
  const orgRef = useRef()

  useEffect(() => {
    if (step >= 0 && step < stepsDef.length) {
      setTotalSteps(stepsDef.length)
      setTitle(stepsDef[step].title)
    }
    switch (step) {
      case 0:
        onCanContinue(true)
        break
      case 1:
        onSubmit({ url: 'https://enrichmentmap.org/' })
    }
  })

  const handleChange = (value) => {
    switch (step) {
      case 0:
        genesRef.current = value
        onCanContinue(value.length > 0)
        break
      case 1:
        orgRef.current = value
        onCanContinue(value != null)
        break
    }
  }

  return (
    <div className="min-h-48">
      {stepsDef.map(({ component: Comp }, idx) => (
        <div key={idx} style={step !== idx ? {display: 'none'} : {}}>
          <Comp onChange={handleChange} />
        </div>
      ))}
    </div>
  )
}