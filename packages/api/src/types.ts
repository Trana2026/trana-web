export type ProblemDetail = {
  type: string;
  title: string;
  status: number;
  detail: string;
  code: string;
  timestamp: string;
  errors?: unknown;
};

export class ApiError extends Error {
  readonly problem: ProblemDetail;

  constructor(problem: ProblemDetail) {
    super(problem.detail || problem.title);
    this.name = 'ApiError';
    this.problem = problem;
  }

  get code(): string {
    return this.problem.code;
  }

  get status(): number {
    return this.problem.status;
  }
}
