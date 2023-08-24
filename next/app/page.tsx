export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="mb-10 mt-10">
        <div className="py-10 mx-auto max-w-fit	 text-center lg:py-16">
          <h1 className="mb-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            マラソンは<mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">地球</mark>を救う。
            <span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">ベータ版</span>
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">夏の終わり頃に放送されるたぶん100kmぐらい走ってるあのテレビ番組みたいに、ゴールに近づく瞬間を盛り上げます。</p>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 mt-20">
            <a href="/api/auth">
              <button className="px-8 py-4 text-sm font-bold text-white transition-colors duration-200 transform bg-[#1DB954] rounded-xl hover:scale-105 text-center ">
                <div className="flex w-full justify-center items-center mb-2">
                  <img src="/Spotify_Logo_RGB_White.png" width="100" className='text-center' />
                </div>
                <p>ログインして始める</p>
              </button>
            </a>
          </div>
        </div>

        <div className="py-8 px-4 mx-auto max-w-fit	 text-center lg:py-16">

          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">使う前の準備。</h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">このアプリを使うには、Spotify PremiumとIFTTT Proのアカウントが必要です。</p>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <a href="https://www.spotify.com/jp/premium/" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                <img src="/Spotify_Logo_RGB_White.png" width="100" />
              </a>
              <a href="https://ifttt.com/" className="w-full sm:w-auto bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                <svg width="90" className='p-1' viewBox="0 0 203 52" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M109.374-.25H68.0791V15.3654H80.3558V52.1734H97.0968V15.3654H109.374V-.25ZM156.249-.25H114.954V15.3654H127.231V52.1734H143.972V15.3654H156.249V-.25ZM203.123-.25H161.829V15.3654H174.105V52.1734H190.846V15.3654H203.123V-.25ZM16.741-.25H0V52.1734H16.741V-.25ZM62.4997-.25H24.5535V52.1734H41.2945V37.6734H55.8033V20.9425H41.2945V15.3654H62.4997V-.25Z" fill="#222"></path></svg>
              </a>
            </div>
          </div>

          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h2 className="text-4xl font-extrabold dark:text-white">マラソン、一人だとテンション上がらないですよね。</h2>
          </div>
          <div className="w-full p-4 text-center sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-lg mx-auto">
              <h5 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white">走るあなたを、音楽で勝手にゴールにエスコート。 </h5>
              <p className="mb-20 max-w-screen-lg text-base text-gray-500 sm:text-lg dark:text-gray-400">
                夏の終わり、一つの夜が明ける頃、私たちはいつもその感動の瞬間をテレビの前で待ちわびています。一人のランナーが、全国の期待を背負い、汗と涙で道のりを刻む。あの特定の日、何万という声援とともに、ゴールを目指すランナーの耳に届く楽曲。このサービスは、あなたが日常で走る中、事前に設定した位置情報に近づく度、そんな感動の音楽を再生します。あの夏の一夜と同じような胸躍る感動を、普段のランニングでも。最後の一歩を踏み出す瞬間、音楽があなたを待っています。
              </p>
            </div>

            <div className="max-w-screen-lg mx-auto">
              <h5 className="mb-5 text-3xl font-bold text-gray-900 dark:text-white">つまり、感動を再生するランニングコンパニオン。</h5>
              <p className="mb-20 max-w-screen-lg text-base text-gray-500 sm:text-lg dark:text-gray-400">
                あなたが走る中で特定の位置に近づくと、胸躍る感動の楽曲が自動的に流れます。日常のランニングを、あの夏の特定の瞬間のような経験へと昇華させるサービスです。
              </p>
            </div>
          </div>


          <section className="">

            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
              <h2 className="text-4xl font-extrabold dark:text-white mb-10">使い方</h2>

              <p className="mb-20 max-w-screen-lg text-base text-gray-500 sm:text-lg dark:text-gray-400 mb-2">
                ↑のSpotifyでログインし、画面に従って再生したいデバイス、再生したい曲を選んでIFTTT用のURLをコピーしてください。
              </p>


              <h3 className="text-2xl font-extrabold dark:text-white">1. IFTTTにログインする</h3>

              <p className="mb-20 max-w-screen-lg text-base text-gray-500 sm:text-lg dark:text-gray-400 mb-2">
                IFTTTにログインし、「<a className='underline' href="https://ifttt.com/create">Create</a>」から新しいAppletsの作成。
                <br />
                ※ IFTTTのiOSアプリ、Androidアプリをインストールし、位置情報の許可をする必要があります。
              </p>

              <h3 className="text-2xl font-extrabold dark:text-white mb-2">2. If Thisに「Location」を追加する</h3>
              <div className='flex w-full justify-center items-center mb-20'>
                <img src="/steps/02.png" width="500" />
                <p className="max-w-screen-lg text-base text-gray-500 sm:text-lg dark:text-gray-400">
                </p>
              </div>

              <h3 className="text-2xl font-extrabold dark:text-white mb-2">3. 「You enter an area」を選択し、再生を始めた絶妙な位置を設定する</h3>
              <div className="mb-20">
                <div className='flex justify-center items-center'>
                  <img src="/steps/03.png" width="500" />
                </div>
                <p className="max-w-screen-lg text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  この作業はとても大切です。<br />あなたがこの枠の中に入った瞬間に、テンションの上がるミュージックの再生が始まります。 <br />
                  絶妙な位置を探して心地よい盛り上げを探してください。
                </p>
              </div>

              <h3 className="text-2xl font-extrabold dark:text-white mb-2">4. 「Then That」を選択し、「Webhooks」を追加する</h3>
              <div className="mb-20">
                <div className='flex justify-center items-center'>
                  <img src="/steps/04.png" width="500" />
                </div>
                <p className="max-w-screen-lg text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  「Make a web request」を選びましょう
                </p>
              </div>

              <h3 className="text-2xl font-extrabold dark:text-white mb-2">5. 先程コピーしたIFTTT用のURLを設定する</h3>
              <div className="mb-20">
                <div className='flex justify-center items-center'>
                  <img src="/steps/05.png" width="500" />
                </div>
                <p className="max-w-screen-lg text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  URL => さきほどコピーしたIFTTT用のURLを貼り付けましょう。<br />
                  Method => POSTを選択してください
                </p>
              </div>

              <h3 className="text-2xl font-extrabold dark:text-white mb-2">6. 保存する</h3>
              <div className="mb-20">
                <div className='flex justify-center items-center'>
                  <img src="/steps/06.png" width="500" />
                </div>
                <p className="max-w-screen-lg text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  Continueを押して保存を完了させてください。<br></br>
                  保存する名前はわかりやすいものを指定しましょう。

                </p>
              </div>

              <h3 className="text-2xl font-extrabold dark:text-white mb-2">7. 有効にする</h3>
              <div className="mb-20">
                <div className='flex justify-center items-center'>
                  <img src="/steps/07.png" width="500" />
                </div>
                <p className="max-w-screen-lg text-base text-gray-500 sm:text-lg dark:text-gray-400">
                  Connectedに変更したら準備完了、あとは走るだけ。
                </p>
              </div>

            </div>
          </section>

        </div>
      </section>


    </main>
  )
}
