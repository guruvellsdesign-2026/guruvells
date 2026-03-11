"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("[ErrorBoundary] Caught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen bg-cream flex items-center justify-center px-8">
                    <div className="max-w-md text-center flex flex-col items-center gap-6">
                        <span className="text-[10px] tracking-[0.4em] uppercase text-dark/30 font-sans">
                            Something went wrong
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-dark leading-tight">
                            We&apos;re experiencing a temporary issue.
                        </h2>
                        <p className="font-sans text-sm text-dark/50 leading-relaxed">
                            Please try refreshing the page. If the problem persists, contact our team.
                        </p>
                        <button
                            onClick={() => {
                                this.setState({ hasError: false, error: null });
                                window.location.reload();
                            }}
                            className="pill-button mt-4"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
