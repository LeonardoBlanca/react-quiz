export default function FinishScreen({points, maxPointsTotal, highscore}) {
    const percentage = (points/maxPointsTotal) * 100;
    let emoji;
    if(percentage === 100) emoji = '🥇';
    if(percentage >= 80 && percentage < 100) emoji = '🎉';
    if(percentage >= 50 && percentage < 80) emoji = '🙃';
    if(percentage >= 0 && percentage < 50) emoji = '🤨';
    if(percentage === 0) emoji = '🤦🏾‍♂️';
    return (
        <>
        <p className="result">{emoji} You've scored <strong>{points}</strong> out of {maxPointsTotal}. ({Math.ceil(percentage)})%</p>
        <p className="highscore">(Highscore: {highscore} points.)</p>
        </>
    );
}