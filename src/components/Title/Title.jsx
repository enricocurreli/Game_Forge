const Title = ({classes, children, tag}) => {
  
    if (tag==="h1") {

        return <h1 className={classes}> {children}</h1>
    }
    if (tag==="h2") {

        return <h2 className={classes}> {children}</h2>

    } if (tag==="h3") {

        return <h3 className={classes}> {children}</h3>

    } if (tag==="h4") {

        return <h4 className={classes}> {children}</h4>

    } if (tag==="h5") {

        return <h5 className={classes}> {children}</h5>

    } if (tag==="h6") {

        return <h6 className={classes}> {children}</h6>
    }


}

export default Title