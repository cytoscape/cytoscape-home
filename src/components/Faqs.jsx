import { Container } from '@/components/base/Container'

const faqs = [
  [
    {
      question: 'Lorem ipsum dolor sit amet?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc nec nibh dapibus facilisis eu vitae nibh. Nulla facilisi. Quisque ullamcorper maximus consectetur.',
    },
    {
      question: 'Ut sed sem id nulla consequat porttitor et sed dolor?',
      answer:
        'Donec dignissim nisi eu efficitur vulputate. Nullam accumsan, nisi accumsan dictum rhoncus, augue leo vehicula odio, ac ultrices orci nunc nec lorem. Nullam at malesuada magna, quis rutrum magna.',
    },
    {
      question: 'Vestibulum hendrerit neque quis cursus elementum?',
      answer:
        'Maecenas quis eros molestie, fringilla erat at, hendrerit erat. Morbi placerat, eros pretium lacinia feugiat, dolor arcu facilisis metus, placerat cursus nibh neque in orci.',
    },
  ],
  [
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipiscing elit?',
      answer:
        'Ut vulputate feugiat nunc in finibus. Nunc lorem magna, pharetra a neque quis, tristique cursus sem. Quisque dignissim vestibulum lacus. ',
    },
    {
      question: 'Etiam vitae nunc vel velit volutpat cursus?',
      answer:
        'Donec tortor elit, efficitur sit amet neque a, placerat efficitur tortor.',
    },
    {
      question: 'Sed eu elit quis ligula cursus lacinia?',
      answer:
        'Ut id felis pulvinar, dapibus elit eget, finibus purus. Aenean venenatis a risus et dapibus. Nam nec magna vestibulum ante ultrices aliquam. Nam mauris metus, consectetur nec purus nec, molestie accumsan neque. Etiam commodo sagittis massa eu sagittis.',
    },
  ],
  [
    {
      question: 'Ut aliquam nulla bibendum finibus semper?',
      answer:
        'Cras ipsum lorem, facilisis ut pellentesque a, sagittis faucibus dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    },
    {
      question: 'Donec quis urna convallis?',
      answer:
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In luctus luctus leo eu egestas.',
    },
    {
      question: 'Sed eget ante vestibulum?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc nec nibh dapibus facilisis eu vitae nibh. Proin vehicula turpis ipsum, sed sodales massa tristique a. Nam arcu eros, convallis a ligula quis, consectetur vehicula purus.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <a
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
