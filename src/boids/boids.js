/* eslint-disable */

import * as THREE from "./three.module.js";

const visualRange = 5;
export const velocity = 0.4;

export function distance(boid1, boid2) {
  var temp = boid1.position.clone();
  temp.sub(boid2.position);
  var dist = temp.length();
  temp = null;
  return dist;
}

export function nClosestBoids(boid, boids, n) {
  const sorted = boids.slice();
  sorted.sort((a, b) => distance(boid, a) - distance(boid, b));
  return sorted.slice(1, n + 1);
}

export function keepWithinBounds(boid, boids) {
  const margin_x = 10;
  const margin_y = 5;
  const turnFactor = 1;

  if (boid.position.x < 0 - margin_x) {
    boid.velocity.x += turnFactor;
  }
  if (boid.position.x > 60 + margin_x) {
    boid.velocity.x -= turnFactor;
  }
  if (boid.position.y < 0 - margin_y) {
    boid.velocity.y += turnFactor;
  }
  if (boid.position.y > 30 + margin_y) {
    boid.velocity.y -= turnFactor;
  }

  // 20 is the MAX_HEIGHT
  if (boid.position.z < 20 + 5) {
    boid.velocity.z += turnFactor;
  }
  if (boid.position.z > 30 + 5) {
    boid.velocity.z -= turnFactor;
  }
}

export function flyTowardsCenter(boid, boids) {
  const centeringFactor = 0.005;

  let center = new THREE.Vector3();
  let numNeighbors = 0;

  for (let otherBoid of boids) {
    if (distance(boid, otherBoid) < visualRange) {
      center.x += otherBoid.position.x;
      center.y += otherBoid.position.y;

      numNeighbors += 1;
    }
  }

  if (numNeighbors > 0) {
    center.divideScalar(numNeighbors);
    center.sub(boid.position);
    center.multiplyScalar(centeringFactor);

    boid.velocity.add(center);
  }
}

export function avoidOthers(boid, boids) {
  const minDistance = 4;
  const avoidFactor = 0.05;

  let move = new THREE.Vector3();
  for (let otherBoid of boids) {
    if (otherBoid !== boid) {
      if (distance(boid, otherBoid) < minDistance) {
        let temp = boid.position.clone();
        temp.sub(otherBoid.position);

        move.add(temp);
        temp = null;
      }
    }
  }

  move.multiplyScalar(avoidFactor);
  boid.velocity.add(move);
}

export function matchVelocity(boid, boids) {
  const matchingFactor = 0.05;

  let avg = new THREE.Vector3();
  let numNeighbors = 0;

  for (let otherBoid of boids) {
    if (distance(boid, otherBoid) < visualRange) {
      avg.add(otherBoid.velocity);
      numNeighbors += 1;
    }
  }

  if (numNeighbors > 0) {
    avg.divideScalar(numNeighbors);
    avg.sub(boid.velocity);
    avg.multiplyScalar(matchingFactor);

    boid.velocity.add(avg);
  }
}

export function limitSpeed(boid, boids) {
  const speedLimit = velocity;

  const speed = boid.velocity.length();

  if (speed > speedLimit) {
    boid.velocity.divideScalar(speed);
    boid.velocity.multiplyScalar(speedLimit);
  }
}
