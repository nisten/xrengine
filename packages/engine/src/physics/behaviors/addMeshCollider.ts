import { Behavior } from '../../common/interfaces/Behavior';
import { ColliderComponent } from '../components/ColliderComponent';
import { RigidBody } from '../../physics/components/RigidBody';
import { Entity } from '../../ecs/classes/Entity';
import { addComponent } from '../../ecs/functions/EntityFunctions';
import { TransformComponent } from "@xr3ngine/engine/src/transform/components/TransformComponent";

export const addMeshCollider: Behavior = (entity: Entity) => {

  addComponent(entity, ColliderComponent, { type: 'box', scale: [10, 0.1, 10] });

  return entity;
};
