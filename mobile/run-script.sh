#!/bin/bash

echo "Which platform would you like to run?"
echo "1) iOS"
echo "2) Android"
echo "3) Expo Start (development server only)"
read -p "Enter choice (1, 2, or 3): " choice

case $choice in
  1)
    echo "Running iOS dev build..."
    pnpm exec expo run:ios --device || exit 1
    ;;
  2)
    echo "Running Android dev build..."
    pnpm exec expo run:android --device || exit 1
    ;;
  3)
    echo "Starting Expo development server..."
    pnpm exec expo start
    ;;
  *)
    echo "Invalid choice. Exiting."
    exit 1
    ;;
esac
