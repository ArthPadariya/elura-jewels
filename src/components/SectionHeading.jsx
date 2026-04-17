function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment =
    align === 'center'
      ? 'mx-auto max-w-3xl text-center items-center'
      : 'max-w-3xl text-left items-start'

  return (
    <div className={`mb-10 flex flex-col gap-4 ${alignment}`}>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
        {description ? (
          <p className="text-base text-muted sm:text-lg">{description}</p>
        ) : null}
      </div>
    </div>
  )
}

export default SectionHeading
