import { CiImageOn } from "react-icons/ci"
import { BsEmojiSmileFill } from "react-icons/bs"
import { useRef, useState, type ChangeEvent, type FormEvent, useEffect } from "react"
import { IoCloseSharp } from "react-icons/io5"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { UserType } from "../../types"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { FaRandom } from "react-icons/fa"
import captionData from "../../lib/captions.json"

type CaptionCategory = "funny" | "sad" | "happy" | "aesthetic" | "nature" | "motivational" | null

const CreatePost = () => {
  const [text, setText] = useState<string>("")
  const [img, setImg] = useState<string | ArrayBuffer | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const [selectedCategory, setSelectedCategory] = useState<CaptionCategory>(null)
  const navigate = useNavigate()

  const imgRef = useRef<HTMLInputElement | null>(null)

  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] })
  const queryClient = useQueryClient()

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }: { text: string; img: string | ArrayBuffer | null }) => {
      try {
        const res = await fetch("https://be-social-8uqb.onrender.com/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ text, img }),
          credentials: "include",
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.message || data.error || "Something went wrong")
        }
        return data
      } catch (error: any) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      setText("")
      setImg(null)
      toast.success("Post created successfully")
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      setIsModalOpen(false)
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    createPost({ text, img })
  }

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImg(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateRandomCaption = () => {
    if (!selectedCategory) {
      toast.error("Please select a caption category first")
      return
    }

    const captions = captionData[selectedCategory]
    const randomIndex = Math.floor(Math.random() * captions.length)
    setText(captions[randomIndex])
    toast.success(`Generated a ${selectedCategory} caption!`)
  }

  useEffect(() => {
    if (!isModalOpen) {
      navigate("/")
    }
  }, [isModalOpen, navigate])

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black/50 z-50 p-4">
      <div className="bg-neutral w-full max-w-xl md:w-[600px] lg:w-[700px] rounded-lg shadow-lg p-6 md:p-4 relative max-h-[90vh] overflow-y-auto">
        {/* Close Modal Button */}
        <button
          className="absolute top-2 right-2 text-white bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600"
          onClick={() => setIsModalOpen(false)}
        >
          <IoCloseSharp className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4 mb-4 md:px-2">
          <div className="avatar">
            <div className="w-12 md:w-12 rounded-full">
              <img src={authUser?.profileImg || "/avatar-placeholder.png"} alt="Profile" />
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold">Create Post</h2>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <textarea
            className="textarea flex-grow md:w-10/12 p-3 md:p-3 md:mx-11 text-base md:text-lg resize-none border border-gray-700 rounded-xl bg-base-200 placeholder-base-content focus:outline-none focus:ring-2 focus:ring-primary min-h-24 md:h-14"
            placeholder="What is happening?!"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Caption Category Selection */}
          <div className="flex flex-col gap-3 md:px-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Choose caption type:</span>
              <button
                type="button"
                className="btn btn-xs btn-primary rounded-full text-white"
                onClick={generateRandomCaption}
                disabled={!selectedCategory}
              >
                <FaRandom className="mr-1" /> Generate
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(captionData) as Array<CaptionCategory>).map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`btn btn-sm ${selectedCategory === category ? "btn-primary" : "btn-outline"} rounded-full text-xs md:text-sm`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category ? (category.charAt(0).toUpperCase() + category.slice(1)) : ""}
                </button>
              ))}
            </div>
          </div>

          {img && (
            <div className="relative w-full max-w-md mx-auto">
              <IoCloseSharp
                className="absolute top-2 right-2 text-white bg-gray-700 rounded-full w-8 h-8 p-1 cursor-pointer"
                onClick={() => {
                  setImg(null)
                  if (imgRef.current) imgRef.current.value = ""
                }}
              />
              <img
                src={typeof img === "string" ? img : ""}
                className="w-full max-h-[400px] object-contain rounded"
                alt="Uploaded"
              />
            </div>
          )}
          <div className="flex justify-between items-center border-t pt-3 md:px-6 border-t-gray-700">
            <div className="flex gap-3 md:gap-4 items-center">
              <CiImageOn
                className="fill-primary w-7 h-7 md:w-8 md:h-8 cursor-pointer"
                onClick={() => imgRef.current?.click()}
              />
              <BsEmojiSmileFill className="fill-primary w-6 h-6 md:w-7 md:h-7 cursor-pointer" />
            </div>
            <input type="file" accept="image/*" hidden ref={imgRef} onChange={handleImgChange} />
            <button
              className="btn btn-primary rounded-full w-2/12 btn-sm md:btn-md text-white px-6 bg-primary hover:bg-primary-dark transition"
              disabled={isPending}
            >
              {isPending ? "Posting..." : "Post"}
            </button>
          </div>
          {isError && <div className="text-red-500 mt-2">{(error as Error).message}</div>}
        </form>
      </div>
    </div>
  )
}

export default CreatePost

