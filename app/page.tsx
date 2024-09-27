'use client'

import { useState, useEffect } from 'react'
import ChatUI from '../components/ChatUI'
import * as webllm from "@mlc-ai/web-llm"
import appConfig from "../config/app-config"
import bgImage from "@/app/svg/oooscillate.svg"

export default function Home() {
  const [engine, setEngine] = useState<webllm.MLCEngineInterface | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initEngine = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const useWebWorker = appConfig.use_web_worker
        let newEngine: webllm.MLCEngineInterface

        if (useWebWorker) {
          newEngine = new webllm.WebWorkerMLCEngine(
            new Worker(new URL("../worker.ts", import.meta.url), { type: "module" }),
            { appConfig, logLevel: "INFO" },
          )
        } else {
          newEngine = new webllm.MLCEngine({ appConfig })
        }

        // Load the default model
        await newEngine.reload(appConfig.model_list[0].model_id)
        setEngine(newEngine)
      } catch (err) {
        console.error("Failed to initialize engine:", err)
        setError("Failed to initialize the chat engine. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    initEngine()
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center p-4" style={{ backgroundImage: `url(${bgImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center 0px' }}>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center text-white mb-8">WebLLM: Serverless AI</h1>
        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            
            <div className="flex space-x-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full animate-bounce animate-pulse"
                  style={{ animationDelay: `${i * 0.15}s` }}
                ></div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : engine ? (
          <ChatUI engine={engine} />
        ) : null}
      </div>
    </main>
  )
}
