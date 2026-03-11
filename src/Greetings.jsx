const Greetings = () => {

  const name = "lsdflkje "
  const work = "Farmer" // "Software Engineer" | "Farmer" | "Teacher" | "Doctor"

  return (
    <>
      <p> {name} {100 + 50}</p>
      {/* <p>{work}</p> */}

      {work === "Software Engineer" && <p>Programmer</p>}
      {work === "Farmer" && <p>Agriculturist</p>}
      {work === "Teacher" && <p>Educator</p>}
      {work === "Doctor" && <p>Healer</p>}

      {
        work === "Software Engineer" ? <p>Programmer</p>
          : work === "Farmer" ? <p>Agriculturist</p>
            : work === "Teacher" ? <p>Educator</p>
              : work === "Doctor" ? <p>Healer</p>
                : <p>Unknown</p>
      }

      <a href="">sldfkjd</a>
    </>
  )
}

export default Greetings