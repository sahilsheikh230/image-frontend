  import { CircularIndeterminate } from "../spinner"
  
  export default function Adjust(
    {

  transform,

  setTransform,

  previewImage,

  stage
    }
  ){
    return (
       <div className="adjust">
<h1>Adjust</h1>
<div>
     <label htmlFor="brightness" className="form-label mt-5 fs-1">Brightness</label>
<input type="range"  id="brightness" className="form-range" min={0.5}

  max={2}

  step={0.1}

  value={transform.brightness} onChange={(e) =>
      setTransform((prev) => ({
        ...prev,
        brightness: Number(e.target.value)
      }))
}></input>
<p className="text-white fs-4 mt-2">

  {transform.brightness}x

</p>
</div>
<div>

 <label
  htmlFor="saturation"
  className="form-label mt-5 fs-1 text-white"
>

  Saturation

</label>

<input

  type="range"

  id="saturation"

  className="form-range"

  min={0}

  max={3}

  step={0.1}

  value={transform.saturation}

  onChange={(e)=>

    setTransform(prev => ({

      ...prev,

      saturation:
        Number(e.target.value)

    }))
  }
/>

<p className="text-white fs-4 mt-2">

  {transform.saturation}x

</p>


  </div>


<div>


  <label
  htmlFor="contrast"
  className="form-label mt-5 fs-1 text-white"
>

  Contrast

</label>

<input

  type="range"

  id="contrast"

  className="form-range"

  min={0.5}

  max={3}

  step={0.1}

  value={transform.contrast}

  onChange={(e)=>

    setTransform(prev => ({

      ...prev,

      contrast:
        Number(e.target.value)
    }))
  }
/>

<p className="text-white fs-4 mt-2">

  {transform.contrast}x

</p>
</div>
<div>




  <label
  htmlFor="blur"
  className="form-label mt-5 fs-1 text-white"
>

  Blur

</label>

<input

  type="range"

  id="blur"

  className="form-range"

  min={0}

  max={10}

  step={0.1}

  value={transform.blur}

  onChange={(e)=>

    setTransform(prev => ({

      ...prev,

      blur:
        Number(e.target.value)
    }))
  }
/>

<p className="text-white fs-4 mt-2">

  {transform.blur}px

</p>
</div>
<br></br>
  {stage==="generating" && (<CircularIndeterminate></CircularIndeterminate>)}
  <br></br>
<button className="previewbtn" onClick={previewImage}>Preview</button>



  </div>
    )
}