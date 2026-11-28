import { describe,it,expect } from 'vitest';
import { pooledMoments,soloGrowth,redistribute,binomialProbabilities,simulateG } from './exp-g';
describe('Experiment G', () => {
  it('one member has growth ½ln1.5+½ln0.6', () => expect(pooledMoments(1,0).value).toBeCloseTo(soloGrowth,12));
  it('fully shared shocks remove pooling benefit at every size', () => { for(const m of [1,2,5,10,50,100]) expect(pooledMoments(m,1).value).toBeCloseTo(soloGrowth,12); });
  it('finite independent groups cannot exceed ln1.05', () => { for(const m of [1,2,5,10,50,100]) expect(pooledMoments(m,0).value).toBeLessThanOrEqual(Math.log(1.05)); });
  it('equal sharing conserves group total: 10 members, 4 heads at 100 each', () => expect(redistribute(100,4,10)*10).toBeCloseTo(4*150+6*60,12));
  it('binomial probabilities sum to 1 for all script sizes', () => { for(const m of [1,2,5,10,50,100]) expect(binomialProbabilities(m).reduce((s,p)=>s+p,0)).toBeCloseTo(1,12); });
  it('matched single-member pooled and unpooled histories agree', () => { const r=simulateG({groups:100,rounds:20,sizes:[1],rhos:[0],comparisonSize:1}); r.pooledMedian.forEach((v,i)=>expect(v).toBeCloseTo(r.unpooledMedian[i]??0,9)); });
  it('simulated growth is within five standard errors of exact', () => { const r=simulateG({groups:1000,rounds:100,sizes:[1,10,100],rhos:[0,1]}); for(const row of r.rows) expect(Math.abs(row.simulated-row.exact)).toBeLessThan(5*Math.sqrt(pooledMoments(row.size,row.rho).variance/100000)); });
});
