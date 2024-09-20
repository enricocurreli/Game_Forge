import { useContext } from "react"
import { ChangePage } from "../../context/ChangePage"


const Section = ({children, classes, aos, aosDuration}) => {

  const {scrolled} = useContext(ChangePage)

  return (
    <section className={classes} ref={scrolled}>
          {children}
    </section>
  )
}

export default Section