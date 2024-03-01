/* eslint-disable react/prop-types */
export default function Progress({index, numQuestions, points, maxPointsTotal, answer}) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)} />
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p><strong>{points}</strong> / {maxPointsTotal}</p>
        </header>
    );
}