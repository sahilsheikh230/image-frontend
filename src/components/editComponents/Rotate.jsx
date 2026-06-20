import { CircularIndeterminate } from "../spinner";

export default function Rotate({setTransform,transform,previewImage,stage}){
    return (
        <div className="mt-5">
        
          <h2 className="text-white">
        
            Rotate
        
          </h2>
        
          <div className="d-flex gap-3 mt-3">
        
            <button
        
              className="btn btn-primary"
        
              onClick={()=>
        {
                setTransform(prev => ({
        
                  ...prev,
        
                  rotation:
                    prev.rotation - 90
                }))
                previewImage()
              }
            }
            >
        
              <i className="fa-solid fa-rotate-left"></i>
        
            </button>
        
            <button
        
              className="btn btn-primary"
        
              onClick={()=>
        {
                setTransform(prev => ({
        
                  ...prev,
        
                  rotation:
                    prev.rotation + 90
                }));
                previewImage()
              }
            }
            >
        
              <i className="fa-solid fa-rotate-right"></i>
        
            </button>
        {stage==="generating" && <CircularIndeterminate></CircularIndeterminate>}
          </div>
        
        </div>
    )
}