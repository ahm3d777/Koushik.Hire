import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('Koushik Ahmed Portfolio — Elite Signature Features', () => {
  it('renders Engineering Mode by default and switches to Client Mode via Dual-Lens switcher', () => {
    render(<App />);
    expect(
      screen.getByText(/Final-year Computer Science student and full-stack developer/i)
    ).toBeInTheDocument();

    const clientBtn = document.getElementById('lens-client-btn');
    fireEvent.click(clientBtn);

    expect(
      screen.getByText(/I partner with ambitious businesses, gyms, brands/i)
    ).toBeInTheDocument();
  });

  it('toggles Live X-Ray Architecture Mode via HUD button', () => {
    render(<App />);
    expect(document.documentElement.getAttribute('data-xray')).toBe('false');

    const xrayBtn = document.getElementById('xray-toggle-btn');
    fireEvent.click(xrayBtn);

    expect(document.documentElement.getAttribute('data-xray')).toBe('true');
    expect(screen.getByText(/X-RAY ARCHITECTURE HUD/i)).toBeInTheDocument();
  });

  it('opens Global Command Palette and executes Interactive Terminal shokti Easter egg', () => {
    render(<App />);
    const cmdkBtn = document.getElementById('cmdk-open-btn');
    fireEvent.click(cmdkBtn);

    const terminalTab = document.getElementById('palette-tab-terminal');
    fireEvent.click(terminalTab);

    const termInput = document.getElementById('terminal-cli-input');
    fireEvent.change(termInput, { target: { value: 'shokti' } });
    fireEvent.submit(termInput.closest('form'));

    expect(
      screen.getByText(/distraction-free React Native workout tracker/i)
    ).toBeInTheDocument();
  });

  it('opens Deep-Dive Case Study modal for Fitness Factory', () => {
    render(<App />);
    const csBtn = document.getElementById('case-study-btn-fitness-factory');
    fireEvent.click(csBtn);

    expect(
      screen.getByText(/Lead Product Designer & Frontend Engineer/i)
    ).toBeInTheDocument();
  });

  it('updates 60-Second Scope Estimator roadmap dynamically when Mobile App is selected', () => {
    render(<App />);
    const mobileTypeBtn = document.getElementById('est-type-mobile-app');
    fireEvent.click(mobileTypeBtn);

    expect(
      screen.getByText(/Unified iOS & Android codebase with native-feel navigation/i)
    ).toBeInTheDocument();
  });
});
