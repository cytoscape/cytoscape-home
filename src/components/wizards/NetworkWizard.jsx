import { useRef, useEffect } from 'react'

const stepsDef = [
  {
    title: "Cytoscape Web",
    component: CyWebPanel,
  },
]

function CyWebPanel() {
  return (
    <div className="text-gray-600">
      <img src="/images/apps/cytoscape-web.png" alt="Cytoscape Web" className="w-fit mx-auto border-4 rounded-lg" />
      <p className="mt-5">
        Upload your spreadsheet data to Cytoscape Web and visualize it as a network.
      </p>
    </div>
  )
}

export function NetworkWizard({ step, setTotalSteps, setTitle, setSubmitLabel, onCanContinue, onSubmit }) {
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
        onSubmit({ url: 'https://web.cytoscape.org/' })
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