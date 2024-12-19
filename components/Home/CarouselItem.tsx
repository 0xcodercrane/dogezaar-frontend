import Image from "next/image";
import Link from "next/link";

interface CarouselItemProps {
  imageURL: string;
  name: string;
  url: string;
}

export default function CarouselItem(props: CarouselItemProps) {
  return (
    <div>
      <Link href={props.url} className="w-full">
        <div className="group">
          <div className="bg-primary-DEFUAULT rounded-md overflow-hidden relative">
            <Image
              width={100}
              height={100}
              src={props.imageURL}
              alt="photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            ></Image>
            <div className="group p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t text-center cursor-pointer from-gray-900">
              <h2 className="text-white font-black text-lg pt-4">
                {props.name}
              </h2>
              <div>
                <div className="sm:px-4 group-hover:h-12 h-0 flex justify-center items-center overflow-hidden duration-500 my-2">
                  <button className="bg-[#f71f71] overflow-hidden w-full  px-4 py-2 rounded-md text-white">
                    Launch Pad
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
