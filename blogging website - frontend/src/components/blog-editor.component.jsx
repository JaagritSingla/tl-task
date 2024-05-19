import {Link} from "react-router-dom";
import logo from "../imgs/logo.png";
// import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";



const BlogEditor=()=>{

    
    const handleBannerUpload=(e)=>{
        // console.log(e);
        let img=e.target.files[0];
        console.log(img);
    }

    // no effect of pressing enter
    const handleTitleKeyDown=(e)=>{
        if(e.keyCode==13){
            e.preventDefault();
        }
    }

    
    
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="flex-none w-10">
                    <img src={logo}/>
                </Link>
                <p className="max-md:hidden text-black line-clamp-1 w-full">
                    New Blog
                </p>

                <div className="flex gap-4 ml-auto">
                    <button className="btn-dark py-2">
                        Publish
                    </button>
                    <button className="btn-light py-2">
                        Save Draft
                    </button>
                </div>
            </nav>

            <section>
                <div className="mx-auto max-w-[900px] w-full">
                    <div className="relative aspect-video bg-white border-4 border-grey">
                        <label htmlFor="uploadBanner">
                            <img 
                                src={defaultBanner}
                                className="z-20"
            
                            />
                            <input
                                id="uploadBanner"
                                type="file"
                                aaccept=".png,.jpg,.jpeg"
                                hidden
                                onChange={handleBannerUpload}
                            />
                        </label>
                    </div>
                    <textarea 
                        placeholder="Blog Title"
                        className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
                        onKeyDown={handleTitleKeyDown}

                    ></textarea>

                    <hr className="w-full opacity-20 my-5"/>

                    <textarea 
                        placeholder="Blog Content"
                        className="text-2xl h-20 w-full outline-none mt-5 leading-tight placeholder:opacity-40"
                    ></textarea>
                </div>
            </section>
        </>
    )
}
export default BlogEditor;