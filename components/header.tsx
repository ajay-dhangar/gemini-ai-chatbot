/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'

async function UserOrLogin() {
  const session = (await auth()) as Session
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          <img className="size-6" src="/images/gemini.png" alt="gemini logo" />
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="size-6 text-zinc-200" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button asChild size="sm" variant="ghost">
          <a
            target="_blank"
            href="https://github.com/Ajay-Dhangar/gemini-ai-chatbot/"
            rel="noopener noreferrer"
          >
            <IconGitHub />
            <span className="hidden ml-2 md:flex">GitHub</span>
          </a>
        </Button>
        <Button asChild size="sm" className="rounded-lg gap-1">
          <a
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fajay-dhangar%2Fgemini-ai-chatbot&env=GOOGLE_GENERATIVE_AI_API_KEY%2CAUTH_SECRET&envDescription=API+Keys&envLink=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fgemini-chatbot%2Fblob%2Fmain%2F.env.example&demo-url=https%3A%2F%2Fgemini.vercel.ai&stores=%5B%7B"type"%3A"kv"%7D%5D&from=templates&skippable-integrations=1&demo-description=Gemini-powered+chatbot+with+the+Vercel+AI+SDK%2C+Next.js%2C+and+React.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F1nvXeRtBeI8sLr1TwJn26j%2F78310e410e7f0c209b306c6bc50b4034%2FGemini.jpg&demo-title=Gemini+AI+Chatbot&project-name=Gemini+AI+Chatbot&repository-name=gemini-ai-chatbot&teamSlug=clone"
            target="_blank"
          >
            <IconVercel className="size-3" />
            <span className="hidden sm:block">Deploy to Vercel</span>
            <span className="sm:hidden">Deploy</span>
          </a>
        </Button>
      </div>
    </header>
  )
}
