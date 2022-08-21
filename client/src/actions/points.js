competitionList.map((val, key) => {
    const name = val.name
    return console.log(name + " normal")
  }) 

  competitionList.reverse().map((val, key) => {
    const name = val.name
    return console.log(name + " al reves")
  }) 


  for (let i = 0; i < competitionList.length; i++) {
    const element = i;
    console.log(element)
  }