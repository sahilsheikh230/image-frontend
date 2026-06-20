
import { CircularIndeterminate } from "../spinner"
export default function Compress({setTransform,transform,previewImage,stage,compressSize}){
    return (
<div>
<label
  htmlFor="quality"
  className="form-label mt-5 fs-1 text-white"
>

  Compression

</label>

<input

  type="range"

  id="quality"

  className="form-range"

  min={10}

  max={100}

  step={1}

  value={transform.quality}

  onChange={(e)=>

    setTransform(prev => ({

      ...prev,

      quality:
        Number(e.target.value)
    }))
  }
/>

<p className="text-white fs-4 mt-2">

  {transform.quality}%

</p>

{stage==="generating" && <CircularIndeterminate></CircularIndeterminate>}

<p className="text-primary fs-3 mt-2"> CompressedSize:  {compressSize
          ? `${(compressSize / 1024).toFixed(2)} KB`
          : "none"}</p>
<button className="previewbtn" onClick={previewImage}>Compress</button>
</div>

    )
}