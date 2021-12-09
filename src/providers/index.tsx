import { ReactNode } from "react";
import { NameEnabler } from './NameEnabler'

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    return (
      <>
        <NameEnabler>
          {children}
        </NameEnabler>
      </>
    )
}

export default Providers;