import { Link } from 'react-router-dom';
import ResearchReplay from '../components/ResearchReplay';

export default function ResearchPage() {
  return <main className="research-lab-page"><header className="research-lab-header"><Link to="/" className="research-lab-header__back">← BACK TO HOME</Link><span>RM / RESEARCH LAB</span><Link to="/contact">CONTACT</Link></header><ResearchReplay /></main>;
}
