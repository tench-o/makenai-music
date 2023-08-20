export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          デザインセンスが無いから、NextJSのデフォルトのデザインをそのまま流用してるよ！
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <img src="earth_nature_futaba.png" className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert' width={180}></img>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] ">
        <h1>マラソンは地球を救う。ベータ</h1>
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] ">
        <a href="/api/auth">
          <button className="px-8 py-4 text-sm font-bold text-white transition-colors duration-200 transform bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-xl hover:scale-105 hover:from-rose-600 hover:to-fuchsia-600">
            Spotifyでログインする
          </button>
        </a>
      </div>
    </main>
  )
}
