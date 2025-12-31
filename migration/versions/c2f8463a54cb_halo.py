"""halo

Revision ID: c2f8463a54cb
Revises: 1cbd3e3107e9
Create Date: 2025-12-13 22:05:29.389739

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c2f8463a54cb'
down_revision: Union[str, Sequence[str], None] = '1cbd3e3107e9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
