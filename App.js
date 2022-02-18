const useCupList = (size, idx) => {
  const [cups, setCups] = React.useState([new Array(size).fill({ full: false })])
  const [remained, setRemained] = React.useState(size * 250 / 1000)
  const capacity = size * 250
  React.useEffect(() => {
    if (idx >= 0) {
      getCups()
    }
    function getCups() {
      let newList = []
      for (let i = 0; i < size; i++) {
        if (i <= idx) newList.push({ full: true });
        else newList.push({ full: false })
      }
      setCups([newList])
      setRemained((capacity - ((idx + 1) * 250)) / 1000)
    }
  }, [idx, remained])

  return { cups: cups[0], remained }
}

const CupContainer = (props) => {
  // const { capacity } = props
  const { remained } = props
  return (
    <div className="cup">
        <div className="remained" style={remained === '0' ?{visibility: `hidden`,height: `0px`}: {}} id="remained">
          <span id="liters">{`${remained}L`}</span>
          <small>Remained</small>
        </div>
      <div className={`percentage ${remained === "2" ? 'hidden' : 'visible'}`} style={{ height: `${(8 - remained * 1000 / 250) / 8 * 330}px` }} id="percentage">
        {remained === '2' ? '' :`${(2 - remained) / 2 * 100}%`}
      </div>
    </div>
  )
}

const Cup = (props) => {
  const { full, setFull, idx } = props
  return (
    <div className={`cup cup-small ${full ? 'full' : ''}`} onClick={e => full ? setFull(idx - 1) : setFull(idx)}>250 ml</div>
  )

}
const Cups = (props) => {
  const { size, setRemained } = props
  const [idx, setIdx] = React.useState()
  const { cups, remained } = useCupList(size, idx)
  const setFull = (idx) => setIdx(idx)
  React.useEffect(() => {
    setRemained(`${remained}`)
  })
  return (
    <div className="cups">
      {
        cups.map((cup, index) => (
          <Cup idx={index} key={index} full={cup.full} setFull={setFull} />
        ))
      }
    </div>
  )
}

const Main = () => {
  const [remained, setRemained] = React.useState()
  return (
    <div className="app">
      <h1>Drink Water</h1>
      <h3>Goal: 2 Liters</h3>
      <CupContainer remained={remained} />
      <p className="text">Select how many glasses of water that you have drank</p>
      <Cups size={8} setRemained={setRemained} />
    </div>
  )
}

const App = () => {
  return (
    <Main />
  )
}

ReactDOM.render(<App />, document.getElementById('app'))