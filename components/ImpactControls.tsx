import GitHubButton from 'react-github-btn';

interface ImpactControlsProps {
    diameter: number;
    setDiameter: (value: number) => void;
    density: number;
    setDensity: (value: number) => void;
    velocity: number;
    setVelocity: (value: number) => void;
    handleRecalculate: () => void;
    impactData: { craterDiameter: number; blastRadius: number; thermalRadius: number };
}

export default function ImpactControls({ diameter, setDiameter, density, setDensity, velocity, setVelocity, handleRecalculate, impactData }: ImpactControlsProps) {
    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl">Asteroid Oh No</h1>
                <p className='text-xs text-gray-400'>version 0.0.1</p>
            </div>
            <div className="flex flex-col gap-2">
                <label>Asteroid Diameter (km): <input className='text-black' type="number" value={diameter} onChange={(e) => setDiameter(Number(e.target.value))} /></label>
                <label>Density (kg/m³): <input className='text-black' type="number" value={density} onChange={(e) => setDensity(Number(e.target.value))} /></label>
                <label>Velocity (km/s): <input className='text-black' type="number" value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} /></label>
                <button onClick={handleRecalculate} className="px-4 py-2 bg-blue-500 text-white rounded">Recalculate</button>
            </div>

            <div className="flex flex-col gap-2">
                <p>Crater Diameter: {impactData.craterDiameter.toFixed(2)} km</p>
                <p>Blast Radius: {impactData.blastRadius.toFixed(2)} km</p>
                <p>Thermal Radiation Radius: {impactData.thermalRadius.toFixed(2)} km</p>
            </div>

            <div>
                <h1 className='text-center'>Contribute to this project on GitHub:</h1>
                <div className='flex justify-around pt-1'>
                    <GitHubButton href="https://github.com/miljkovicjovan/asteroid-oh-no/issues" data-color-scheme="no-preference: light; light: light; dark: dark;"
                        data-icon="octicon-issue-opened" data-size="large" aria-label="Issue buttons/github-buttons on GitHub">Issue</GitHubButton>
                    <GitHubButton href="https://github.com/miljkovicjovan/asteroid-oh-no" data-color-scheme="no-preference: light; light: light; dark: dark;"
                        data-icon="octicon-star" data-size="large" aria-label="Star buttons/github-buttons on GitHub">Star</GitHubButton>
                    <GitHubButton href="https://github.com/miljkovicjovan/asteroid-oh-no" data-color-scheme="no-preference: light; light: light; dark: dark;"
                        data-icon="octicon-heart" data-size="large" aria-label="Sponsor @buttons on GitHub">Sponsor</GitHubButton>
                </div>
            </div>
        </div >
    );
}
