#!/bin/bash

OUTPUT_FILE="./llm/combined.md"

# detect OS
uname_s="$(uname -s)"
case "$uname_s" in
  Darwin*) OS="mac" ;;
  Linux*)  OS="linux" ;;
  MINGW*|MSYS*|CYGWIN*) OS="windows" ;;
  *)       OS="unknown" ;;
esac

# ensure temp dir outside repo
TMPDIR="${TMPDIR:-/tmp}"

# portable mktemp: try template in TMPDIR (works on GNU/BSD), then -t (BSD), finally fallback
if TEMP_FILE=$(mktemp "$TMPDIR/combined_temp_XXXXXX.md" 2>/dev/null); then
  :
elif TEMP_FILE=$(mktemp -t combined_temp 2>/dev/null); then
  :
else
  TEMP_FILE="$TMPDIR/combined_temp_$$.tmp"
  : > "$TEMP_FILE"
fi

trap 'rm -f "$TEMP_FILE"' EXIT

mkdir -p ./llm

if [ -f "$OUTPUT_FILE" ]; then
  mv "$OUTPUT_FILE" "${OUTPUT_FILE}.bak_$(date +%Y%m%d_%H%M%S)"
fi

> "$TEMP_FILE"

get_language() {
  case "$1" in
    *.ts) echo "typescript" ;;
    *.js) echo "javascript" ;;
    *.json) echo "json" ;;
    *.md) echo "markdown" ;;
    *.sh) echo "bash" ;;
    *.xib|*.xml) echo "xml" ;;
    *.yml|*.yaml) echo "yaml" ;;
    *.css) echo "css" ;;
    *.html) echo "html" ;;
    *.config) echo "ini" ;;
    *.rc) echo "ini" ;;
    *.eslintrc) echo "json" ;;
    *) echo "" ;;
  esac
}

processed_files=0

# Build a set of paths ignored by Git (if this is a git worktree).
# This allows honoring .gitignore in the file-collection loop below.
declare -A IGNORED_FILES
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  # git ls-files -oi --exclude-standard -z lists ignored files (NUL-delimited)
  while IFS= read -r -d '' p; do
    # normalize (remove leading ./ if present)
    p="${p#./}"
    IGNORED_FILES["$p"]=1
  done < <(git ls-files -oi --exclude-standard -z 2>/dev/null || true)
else
  # not a git repo or git not available; IGNORED_FILES stays empty
  :
fi

while IFS= read -r -d '' file; do
  relative_path="${file#./}"
  # skip files matched by .gitignore (if any)
  if [ -n "${IGNORED_FILES[$relative_path]:-}" ]; then
    # optional: echo skipped files to stderr for debugging
    # echo "Skipping ignored: $relative_path" >&2
    continue
  fi
  lang=$(get_language "$file")
  {
    echo "===== FILE: $relative_path ====="
    # print opening fence (use 3 backticks)
    if [ -n "$lang" ]; then
      printf '```%s\n' "$lang"
    else
      printf '```\n'
    fi

    # Only skip first line if it exactly matches the language name (normalize CRLF)
    first_line=$(head -n 1 "$file" 2>/dev/null | tr -d '\r')
    if [ -n "$lang" ] && [ "$first_line" = "$lang" ]; then
      tail -n +2 "$file"
    else
      cat "$file"
    fi

    # closing fence
    printf '```\n'
    echo "===== END OF FILE: $relative_path ====="
    echo
  } >> "$TEMP_FILE"
  ((processed_files++))
done < <(find . -type f \
  -not -path "./llm/*" \
  -not -path "./node_modules/*" \
  -not -path "./.git/*" \
  -not -path "./.env*" \
  -not -path "*.lock" \
  -not -path "./_combine_files.sh" \
  -not -path "./dist/*" \
  -not -path "./.nuxt*" \
  -not -path "*.lock" \
  -not -path "./_combine_files.sh" \
  -print0)

if [ "$processed_files" -eq 0 ]; then
  echo "No files found."
  exit 0
fi

mv "$TEMP_FILE" "$OUTPUT_FILE"

echo "Combined $processed_files files into $OUTPUT_FILE"
