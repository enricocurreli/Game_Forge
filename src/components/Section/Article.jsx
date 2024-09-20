

const Article = ({children, classes, aos, aosDuration }) => {
  return (
    <article className={classes} data-aos={aos} data-aos-duration={aosDuration}> {children}</article>
  )
}

export default Article