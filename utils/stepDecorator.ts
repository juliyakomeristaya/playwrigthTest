import test from "@playwright/test";

export function step<T>(_stepName?: string) {
  return function (
    target: (...args: any[]) => Promise<T>,
    context: ClassMethodDecoratorContext,
  ) {
    return function (this: any, ...args: any[]): Promise<T> {
      const isStatic = typeof this === "function";
      const className = isStatic
        ? this.name
        : getOriginalClass(this, context.name.toString());
      const methodDetails = `${className}.${context.name.toString()}`;

      const { paramNames, defaultValues } = extractFunctionParamNames(target);

      const name = _stepName
        ? `${replacePlaceholders(_stepName, args, paramNames, defaultValues)} - ${methodDetails}`
        : methodDetails;

      const error = new Error("Capturing stack trace");
      const stackLines = error.stack?.split("\n") || [];
      const stack = stackLines.find(
        (line) => line.includes(".ts:") && !line.includes("step-decorator.ts"),
      );
      const filePath = stack?.match(/tests\/(.+)/);
      const finalPath = filePath ? `.../${filePath[1]}` : null;

      const stepNameWithStack = `${name} — ${finalPath}`;

      return test.step(stepNameWithStack, async () => {
        return (await target.call(this, ...args)) as T;
      });
    };
  };
}
function getOriginalClass(instance: any, methodName: string): string {
  return instance.constructor.name;
}

function extractFunctionParamNames<T>(target: (...args: any[]) => Promise<T>): {
  paramNames: string[];
  defaultValues: any[];
} {
  const funcStr = target.toString();

  // Extract parameter list from function string
  const paramMatch = funcStr.match(/\(([^)]*)\)/);
  if (!paramMatch || !paramMatch[1].trim()) {
    return { paramNames: [], defaultValues: [] };
  }

  const paramStr = paramMatch[1];
  const params = paramStr.split(",").map((p) => p.trim());

  const paramNames: string[] = [];
  const defaultValues: any[] = [];

  params.forEach((param) => {
    // Handle default values
    if (param.includes("=")) {
      const [name, defaultVal] = param.split("=").map((s) => s.trim());
      paramNames.push(name.replace(/:\s*\w+/, "").trim()); // Remove type annotations
      try {
        defaultValues.push(eval(defaultVal));
      } catch {
        defaultValues.push(defaultVal);
      }
    } else {
      paramNames.push(param.replace(/:\s*\w+/, "").trim()); // Remove type annotations
      defaultValues.push(undefined);
    }
  });

  return { paramNames, defaultValues };
}
function replacePlaceholders(
  stepName: string,
  args: any[],
  paramNames: string[],
  defaultValues: any[],
): string {
  let result = stepName;

  paramNames.forEach((paramName, index) => {
    const placeholder = `{${paramName}}`;
    if (result.includes(placeholder)) {
      const value = index < args.length ? args[index] : defaultValues[index];
      const stringValue =
        value !== undefined && value !== null ? String(value) : "undefined";
      result = result.replace(
        new RegExp(`\\{${paramName}\\}`, "g"),
        stringValue,
      );
    }
  });

  return result;
}
