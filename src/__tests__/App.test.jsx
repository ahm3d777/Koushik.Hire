import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import App from '../App';

describe('Koushik Ahmed Portfolio v2.0 — Blueprint Verification', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  it('supports ?lens=client URL routing and switches lenses without losing DOM height sizers', () => {
    window.history.replaceState({}, '', '/?lens=client');
    render(<App />);

    expect(document.getElementById('lens-client-btn')).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    fireEvent.click(document.getElementById('lens-engineer-btn'));
    expect(document.getElementById('lens-engineer-btn')).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('toggles X-Ray Mode on single-key X and NEVER hijacks Ctrl+X (Cut)', () => {
    render(<App />);
    expect(document.documentElement.getAttribute('data-xray')).toBe('false');

    // Ctrl+X must NOT toggle X-Ray Mode
    fireEvent.keyDown(window, { key: 'x', ctrlKey: true });
    expect(document.documentElement.getAttribute('data-xray')).toBe('false');

    // Single-key X (outside inputs) MUST toggle X-Ray Mode
    fireEvent.keyDown(window, { key: 'x' });
    expect(document.documentElement.getAttribute('data-xray')).toBe('true');
  });

  it('opens Command Palette on `/` key and executes Terminal shokti chip', () => {
    render(<App />);
    fireEvent.keyDown(window, { key: '/' });

    const terminalTab = document.getElementById('palette-tab-terminal');
    fireEvent.click(terminalTab);

    const shoktiChip = screen.getByRole('button', { name: 'shokti' });
    fireEvent.click(shoktiChip);

    expect(
      screen.getByText(/distraction-free React Native workout tracker/i)
    ).toBeInTheDocument();
  });

  it('updates URL to /work/fitness-factory and shows honest Concept Prototype framing in Case Study', () => {
    render(<App />);
    const csBtn = document.getElementById('case-study-btn-fitness-factory');
    fireEvent.click(csBtn);

    expect(window.location.pathname).toBe('/work/fitness-factory');
    expect(
      screen.getByText(/Product Design & Frontend Engineering \(Concept Pitch\)/i)
    ).toBeInTheDocument();
  });

  it('updates unified 4-step Scope Estimator when Mobile App is selected', () => {
    render(<App />);
    const mobileTypeBtn = document.getElementById('est-type-mobile-app');
    fireEvent.click(mobileTypeBtn);

    expect(
      screen.getByText(/Unified iOS & Android codebase with native-feel navigation/i)
    ).toBeInTheDocument();
  });
});
