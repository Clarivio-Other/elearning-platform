"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { QuizQuestion } from "@/types";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { useLearning } from "@/context/LearningContext";
import { modules, UNLOCK_THRESHOLD } from "@/data/modules";

interface QuizProps {
  moduleId: string;
  questions: QuizQuestion[];
  maxCredits: number;
}

type Phase = "answering" | "feedback" | "results";

export default function Quiz({ moduleId, questions, maxCredits }: QuizProps) {
  const router = useRouter();
  const { submitQuiz, isModuleUnlocked } = useLearning();

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>("answering");
  const [finalScore, setFinalScore] = useState(0);

  const question = questions[currentQ];
  const isLast = currentQ === questions.length - 1;

  // Find next module
  const modIndex = modules.findIndex((m) => m.id === moduleId);
  const nextModule = modIndex < modules.length - 1 ? modules[modIndex + 1] : null;

  const handleSelect = (optIndex: number) => {
    if (phase !== "answering") return;
    setSelectedOption(optIndex);
    setPhase("feedback");
  };

  const handleNext = async () => {
    const newAnswers = [...answers, selectedOption!];

    if (isLast) {
      // Submit
      setAnswers(newAnswers);
      const score = await submitQuiz(moduleId, newAnswers);
      setFinalScore(score);
      setPhase("results");
    } else {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
      setPhase("answering");
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setAnswers([]);
    setPhase("answering");
    setFinalScore(0);
  };

  // --- RESULTS SCREEN ---
  if (phase === "results") {
    const percent = (finalScore / maxCredits) * 100;
    const passed = finalScore >= maxCredits * UNLOCK_THRESHOLD;
    const nextUnlocked = nextModule ? isModuleUnlocked(nextModule.id) : false;

    return (
      <div className="space-y-6 text-center">
        <div
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full
            ${passed ? "bg-success/20" : "bg-danger/20"}`}
        >
          {passed ? (
            <CheckCircle className="h-10 w-10 text-success" />
          ) : (
            <XCircle className="h-10 w-10 text-danger" />
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold">
            {passed ? "Ottimo lavoro!" : "Riprova!"}
          </h3>
          <p className="mt-2 text-foreground-muted">
            {passed
              ? "Hai superato il quiz con successo."
              : `Devi ottenere almeno l'80% per procedere. Hai ottenuto il ${Math.round(percent)}%.`}
          </p>
        </div>

        <div className="mx-auto max-w-xs">
          <ProgressBar
            value={percent}
            label={`${finalScore}/${maxCredits} crediti`}
            size="lg"
          />
        </div>

        {/* Per-question breakdown */}
        <div className="mx-auto max-w-md space-y-2 text-left">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correctIndex;
            return (
              <div
                key={q.id}
                className={`flex items-center gap-3 rounded-xl p-3 text-sm
                  ${correct ? "bg-success/10" : "bg-danger/10"}`}
              >
                {correct ? (
                  <CheckCircle className="h-4 w-4 shrink-0 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0 text-danger" />
                )}
                <span className="flex-1">{q.question}</span>
                <span className="font-semibold">
                  {correct ? `+${q.credits}` : "0"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="secondary" onClick={handleRetry}>
            <RotateCcw className="h-4 w-4" />
            Riprova
          </Button>
          <Button variant="ghost" onClick={() => router.push("/")}>
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
          {nextUnlocked && nextModule && (
            <Button onClick={() => router.push(`/modulo/${nextModule.id}`)}>
              Modulo Successivo
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // --- QUIZ QUESTION ---
  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-foreground-muted">
        <span>
          Domanda {currentQ + 1} di {questions.length}
        </span>
        <span>{question.credits} crediti</span>
      </div>
      <ProgressBar
        value={((currentQ + (phase === "feedback" ? 1 : 0)) / questions.length) * 100}
        showPercentage={false}
        size="sm"
      />

      {/* Question */}
      <h3 className="text-base sm:text-lg font-semibold">{question.question}</h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, i) => {
          let classes =
            "w-full rounded-xl border p-3 sm:p-4 text-left transition-all duration-200 cursor-pointer";

          if (phase === "feedback") {
            if (i === question.correctIndex) {
              classes += " border-success bg-success/10 text-success";
            } else if (i === selectedOption) {
              classes += " border-danger bg-danger/10 text-danger";
            } else {
              classes += " border-border bg-surface text-foreground-muted opacity-50";
            }
          } else {
            classes +=
              i === selectedOption
                ? " border-viola bg-viola/10"
                : " border-border hover:border-viola/50 hover:bg-viola/5";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={phase === "feedback"}
              className={classes}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold
                    ${
                      phase === "feedback" && i === question.correctIndex
                        ? "bg-success/20 text-success"
                        : phase === "feedback" && i === selectedOption
                          ? "bg-danger/20 text-danger"
                          : "bg-surface-alt text-foreground-muted"
                    }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm">{opt}</span>
                {phase === "feedback" && i === question.correctIndex && (
                  <CheckCircle className="ml-auto h-5 w-5 text-success" />
                )}
                {phase === "feedback" &&
                  i === selectedOption &&
                  i !== question.correctIndex && (
                    <XCircle className="ml-auto h-5 w-5 text-danger" />
                  )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Next button (only after answering) */}
      {phase === "feedback" && (
        <div className="flex justify-end">
          <Button onClick={handleNext}>
            {isLast ? "Vedi Risultati" : "Prossima Domanda"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
