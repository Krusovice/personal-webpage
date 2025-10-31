# backend/Dockerfile
FROM rustlang/rust:nightly as builder
WORKDIR /app

# cache deps
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main(){}" > src/main.rs && cargo build --release && rm -rf src

# build
COPY . .
RUN cargo build --release && strip target/release/backend

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates curl && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/target/release/backend /usr/local/bin/backend
ENV RUST_LOG=info
EXPOSE 5000
HEALTHCHECK --interval=10s --timeout=3s --retries=10 \
  CMD curl -fsS http://localhost:5000/healthz || exit 1
CMD ["backend"]
