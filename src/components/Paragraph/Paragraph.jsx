

const Paragraph = ({children, classes, aos}) => {
  return (
    
    <p data-aos={aos} className={classes}>{children}</p>
  )
}

export default Paragraph