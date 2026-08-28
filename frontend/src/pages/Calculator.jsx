import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Calculator.css';

const Calculator = () => {
  const [monthlySpend, setMonthlySpend] = useState(100);
  const [wastePercentage, setWastePercentage] = useState(20);

  
  const yearly = monthlySpend * 12;
  const threeYear = yearly * 3;
  const fiveYear = yearly * 5;
  const yearlyWaste = yearly * (wastePercentage / 100);
  const threeYearWaste = yearlyWaste * 3;

  
  const spendProgress = Math.min(Math.max(((monthlySpend - 10) / (1000 - 10)) * 100, 0), 100);
  const wasteProgress = Math.min(Math.max(wastePercentage, 0), 100);

  return (
    <div className="calc-page">
      <Sidebar />
      <main className="calc-main animate-page">
        <div className="calc-grid-layout">
          
          {}
          <div className="calc-left-col">
            <div className="calc-hero">
              <h1>See What You're<br /><span className="gradient-text">Really Paying For.</span></h1>
              <p>Move the sliders or type the numbers to see your cumulative cost and potential savings.</p>
            </div>

            <div className="waste-card glass-panel">
              <div className="waste-icon-ring">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
              </div>
              <div className="waste-sub">YOU COULD BE WASTING</div>
              <div className="waste-huge-val gradient-text">${yearlyWaste.toLocaleString()}</div>
              <div className="waste-freq">EVERY YEAR</div>
              
              <div className="waste-divider"></div>
              
              <p className="waste-footer-text">
                By auditing your accounts, you could recover <br/>
                <span className="highlight-blue">${threeYearWaste.toLocaleString()} over 3 years.</span>
              </p>
            </div>
          </div>

          {}
          <div className="calc-right-col">
            
            <div className="section-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
              Adjust Your Inputs
            </div>

            <div className="inputs-grid">
              
              {}
              <div className="input-card glass-panel">
                <div className="slider-group">
                  <div className="slider-header">
                    <div>
                      <label>Monthly Spend</label>
                      <p>Total monthly cost</p>
                    </div>
                    
                    {}
                    <div className="transparent-input-badge">
                      <span>$</span>
                      <input 
                        type="number" 
                        value={monthlySpend} 
                        onChange={(e) => setMonthlySpend(Number(e.target.value))}
                        className="naked-input"
                      />
                      <span>/mo</span>
                    </div>
                  </div>
                  
                  <div className="custom-range-wrapper">
                    <input 
                      type="range" min="10" max="1000" step="5"
                      value={monthlySpend} onChange={(e) => setMonthlySpend(Number(e.target.value))}
                      className="sleek-slider thumb-primary"
                      style={{ background: `linear-gradient(to right, #6366f1 ${spendProgress}%, rgba(148, 163, 184, 0.2) ${spendProgress}%)` }}
                    />
                  </div>
                </div>
              </div>

              {}
              <div className="input-card glass-panel">
                <div className="slider-group">
                  <div className="slider-header">
                    <div>
                      <label>Unused Subs</label>
                      <p>Percentage not used</p>
                    </div>
                    
                    {}
                    <div className="transparent-input-badge">
                      <input 
                        type="number" 
                        min="0" max="100"
                        value={wastePercentage} 
                        onChange={(e) => setWastePercentage(Number(e.target.value))}
                        className="naked-input"
                      />
                      <span>%</span>
                    </div>
                  </div>

                  <div className="custom-range-wrapper">
                    <input 
                      type="range" min="0" max="100" step="5"
                      value={wastePercentage} onChange={(e) => setWastePercentage(Number(e.target.value))}
                      className="sleek-slider thumb-secondary"
                      style={{ background: `linear-gradient(to right, #3b82f6 ${wasteProgress}%, rgba(148, 163, 184, 0.2) ${wasteProgress}%)` }}
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="section-header" style={{marginTop: '30px'}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Your Cumulative Projections
            </div>

            <div className="projections-grid">
              <div className="proj-card glass-panel">
                <div className="proj-icon-ring primary-ring"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
                <div className="proj-year">1 YEAR</div>
                <div className="proj-amount">${yearly.toLocaleString()}</div>
              </div>

              <div className="proj-card glass-panel">
                <div className="proj-icon-ring primary-ring"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
                <div className="proj-year">3 YEARS</div>
                <div className="proj-amount">${threeYear.toLocaleString()}</div>
              </div>

              <div className="proj-card glass-panel highlight-card">
                <div className="proj-icon-ring secondary-ring"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
                <div className="proj-year">5 YEARS</div>
                <div className="proj-amount">${fiveYear.toLocaleString()}</div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Calculator;