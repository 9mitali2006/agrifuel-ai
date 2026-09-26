import { Component, type ReactNode } from 'react'
import { ErrorState } from './LoadingState'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error('AgriFuel AI caught an error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <ErrorState
            title="This page hit a snag"
            description="AgriFuel AI recovered safely. Try navigating to another section using the sidebar."
          />
        </div>
      )
    }
    return this.props.children
  }
}
