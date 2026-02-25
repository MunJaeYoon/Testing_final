#!/bin/bash

echo "=== Pawfiler Services Health Check ==="
echo ""

# Check if services are running
echo "📊 Container Status:"
docker ps --filter "name=pawfiler" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep pawfiler

echo ""
echo "📝 Service Logs:"
echo ""

echo "🔐 Auth Service:"
docker logs pawfiler-auth --tail 3 2>&1 | tail -1

echo ""
echo "❓ Quiz Service:"
docker logs pawfiler-quiz --tail 3 2>&1 | tail -1

echo ""
echo "👥 Community Service:"
docker logs pawfiler-community --tail 3 2>&1 | tail -1

echo ""
echo "💳 Payment Service:"
docker logs pawfiler-payment --tail 3 2>&1 | tail -1

echo ""
echo "📱 Dashboard BFF:"
docker logs pawfiler-dashboard-bff --tail 3 2>&1 | tail -1

echo ""
echo "🗄️  PostgreSQL:"
docker exec pawfiler-postgres pg_isready -U pawfiler 2>&1

echo ""
echo "📨 Kafka:"
docker exec pawfiler-kafka kafka-broker-api-versions --bootstrap-server localhost:9092 2>&1 | head -1

echo ""
echo "🌐 Envoy Proxy:"
curl -s http://localhost:9901/ready && echo "✅ Envoy is ready" || echo "❌ Envoy is not ready"

echo ""
echo "=== All services are running! ==="
