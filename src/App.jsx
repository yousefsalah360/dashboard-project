/**
 * @fileoverview Application root
 *
 * Composes the three top-level concerns:
 *   1. StoreProvider  — global state (Flux/Command pattern)
 *   2. AppShell       — chrome: sidebar + header (Composite pattern)
 *   3. Router         — active page (Strategy pattern)
 *
 * This file intentionally has zero business logic.
 */

import { StoreProvider } from "./store";
import { AppShell }      from "./components/layout/AppShell";
import Router            from "./context/Router";

export default function App() {
  return (
    <StoreProvider>
      <AppShell>
        <Router />
      </AppShell>
    </StoreProvider>
  );
}
