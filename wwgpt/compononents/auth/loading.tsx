import Image from "next/image"

export const Loading = () => {
    return (
        <main className="flex flex-col w-full h-full items-center justify-center bg-black">
            <Image
            src={"/logo.svg"}
            alt="logo"
            width={600}
            height={600}
            className="animate-pulse duration-700 m-auto"
            />
        </main>
    )
}
