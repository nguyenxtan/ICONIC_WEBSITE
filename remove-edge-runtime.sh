#!/bin/bash

# Remove edge runtime from API routes
files=(
  "src/app/api/media/route.ts"
  "src/app/api/tracking/shipmentlink/route.ts"
  "src/app/api/tracking/evergreen/route.ts"
  "src/app/api/contact/route.ts"
  "src/app/(public)/services/tracking/page.tsx"
  "src/app/(public)/page.tsx"
  "src/app/(public)/news/page.tsx"
  "src/app/(public)/about/page.tsx"
  "src/app/(public)/vision-mission/page.tsx"
  "src/app/(public)/contact/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    # Remove the edge runtime export line
    sed -i.bak "/export const runtime = ['\"]edge['\"]/d" "$file"
    rm "${file}.bak"
  fi
done

echo "Done!"
